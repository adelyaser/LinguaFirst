import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {ArrowRight, GraduationCap} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const role = email.includes('teacher') ? 'teacher' : 'student';
      await login(email, password, role);
      toast.success('Login successful!');
      navigate(role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard');
    } catch (error) {
      toast.error('Не удалось войти. Попробуйте снова!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <span className="text-2xl font-semibold text-gray-900">LinguaFirst</span>
        </Link>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Добро пожаловать снова!</CardTitle>
            <CardDescription>
              Введите свои учетные данные для входа в личный кабинет
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jungkook@linguafirst.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Пароль</Label>
                  <Link
                    to="/password-recovery"
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Забыли пароль?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Вход в систему...' : 'Войти'} <ArrowRight/>
              </Button>
            </form>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900 mb-2">Тестовые аккаунты:</p>
              <div className="text-xs text-gray-600 space-y-1">
                <p>Ученик: student@linguafirst.com</p>
                <p>Учитель: teacher@linguafirst.com</p>
                <p>Пароль: любой</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-center w-full text-gray-600">
              Нет аккаунта?{' '}
              <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                Зарегистрируйтесь
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
