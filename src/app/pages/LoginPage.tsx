import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowRight, GraduationCap } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../context/AuthContext';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await login(email, password);
      toast.success(t('auth.loginSuccess'));
      navigate(user.role === 'admin' ? '/admin/assignments' : user.role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('auth.loginError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-semibold text-gray-900">LinguaFirst</span>
          </Link>
          <LanguageSwitcher />
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">{t('auth.loginTitle')}</CardTitle>
            <CardDescription>{t('auth.loginDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('common.email')}</Label>
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
                  <Label htmlFor="password">{t('common.password')}</Label>
                  <Link to="/password-recovery" className="text-sm text-blue-600 hover:text-blue-700">
                    {t('auth.forgotPassword')}
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
                {loading ? t('auth.loginLoading') : t('auth.loginSubmit')} <ArrowRight />
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-center w-full text-gray-600">
              {t('auth.noAccount')}{' '}
              <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                {t('auth.signupLink')}
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
