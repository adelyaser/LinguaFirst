import { createContext, ReactNode, useContext, useCallback, useEffect, useMemo, useState } from 'react';
import { getAuthToken, useAuth } from './AuthContext';

export interface DbTeacher {
  id: string;
  name: string;
  level: string;
  specialty: string;
  email: string;
}

export interface DbStudent {
  id: string;
  name: string;
  email: string;
  level: string;
  progress: number;
  assignedTeacherId: string | null;
}

interface LearningDbState {
  teachers: DbTeacher[];
  students: DbStudent[];
}

interface LearningDbContextType extends LearningDbState {
  loading: boolean;
  error: string | null;
  assignStudentToTeacher: (studentId: string, teacherId: string | null) => Promise<void>;
  deleteTeacher: (teacherId: string) => Promise<void>;
  getStudentsForTeacher: (teacherId: string) => DbStudent[];
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const LearningDbContext = createContext<LearningDbContextType | undefined>(undefined);

function authHeaders() {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function LearningDbProvider({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const [db, setDb] = useState<LearningDbState>({ teachers: [], students: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshDb = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [teachersResponse, studentsResponse] = await Promise.all([
        fetch(`${API_URL}/teachers`, { headers: authHeaders() }),
        fetch(`${API_URL}/students`, { headers: authHeaders() }),
      ]);

      if (!teachersResponse.ok || !studentsResponse.ok) {
        throw new Error('Failed to load database');
      }

      const [teachers, students] = await Promise.all([
        teachersResponse.json(),
        studentsResponse.json(),
      ]);

      setDb({ teachers, students });
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Failed to load database');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading) {
      refreshDb();
    }
  }, [authLoading, refreshDb, user?.id, user?.role]);

  const value = useMemo<LearningDbContextType>(() => ({
    ...db,
    loading,
    error,
    assignStudentToTeacher: async (studentId, teacherId) => {
      const response = await fetch(`${API_URL}/students/${encodeURIComponent(studentId)}/teacher`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify({ teacherId }),
      });

      if (!response.ok) {
        throw new Error('Failed to update assignment');
      }

      setDb((current) => ({
        ...current,
        students: current.students.map((student) =>
          student.id === studentId ? { ...student, assignedTeacherId: teacherId } : student,
        ),
      }));
    },
    deleteTeacher: async (teacherId) => {
      const response = await fetch(`${API_URL}/teachers/${encodeURIComponent(teacherId)}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error || 'Failed to delete teacher');
      }

      setDb((current) => ({
        teachers: current.teachers.filter((teacher) => teacher.id !== teacherId),
        students: current.students.map((student) =>
          student.assignedTeacherId === teacherId ? { ...student, assignedTeacherId: null } : student,
        ),
      }));
    },
    getStudentsForTeacher: (teacherId) =>
      db.students.filter((student) => student.assignedTeacherId === teacherId),
  }), [db, error, loading]);

  return (
    <LearningDbContext.Provider value={value}>
      {children}
    </LearningDbContext.Provider>
  );
}

export function useLearningDb() {
  const context = useContext(LearningDbContext);
  if (!context) {
    throw new Error('useLearningDb must be used within a LearningDbProvider');
  }
  return context;
}
