import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type UserRole = 'student' | 'teacher' | 'admin' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
const AUTH_TOKEN_KEY = 'linguafirst_auth_token';
const ALLOWED_SIGNUP_EMAIL_PATTERN = /^[^@\s]+@linguafirst\.com$/i;

async function parseAuthResponse(response: Response) {
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error || 'Authentication failed');
  }

  return payload;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);

    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(parseAuthResponse)
      .then((payload) => setUser(payload.user))
      .catch(() => {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const payload = await parseAuthResponse(await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }));

    localStorage.setItem(AUTH_TOKEN_KEY, payload.token);
    setUser(payload.user);
    return payload.user as User;
  };

  const signup = async (email: string, password: string, name: string, role: UserRole) => {
    if (!ALLOWED_SIGNUP_EMAIL_PATTERN.test(email.trim())) {
      throw new Error('Registration is available only with @linguafirst.com email addresses');
    }

    const payload = await parseAuthResponse(await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name, role: role || 'student' }),
    }));

    localStorage.setItem(AUTH_TOKEN_KEY, payload.token);
    setUser(payload.user);
  };

  const logout = () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setUser(null);

    if (token) {
      fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {
        // The local session is already cleared; server cleanup can fail silently.
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
