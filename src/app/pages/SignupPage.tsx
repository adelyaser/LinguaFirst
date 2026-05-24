import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { GraduationCap, User, UserCog } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { useAuth, UserRole } from '../context/AuthContext';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

const ALLOWED_EMAIL_PATTERN = /^[^@\s]+@linguafirst\.com$/i;

export default function SignupPage() {
  const [searchParams] = useSearchParams();
  const defaultRole = (searchParams.get('role') as UserRole) || 'student';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: defaultRole,
  });
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error(t('auth.passwordMismatch'));
      return;
    }

    if (formData.password.length < 6) {
      toast.error(t('auth.passwordTooShort'));
      return;
    }

    if (!ALLOWED_EMAIL_PATTERN.test(formData.email.trim())) {
      toast.error(t('auth.emailDomainOnly'));
      return;
    }

    setLoading(true);

    try {
      await signup(formData.email.trim(), formData.password, formData.name.trim(), formData.role as UserRole);
      toast.success(t('auth.signupSuccess'));
      navigate(formData.role === 'admin' ? '/admin/assignments' : formData.role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('auth.signupError'));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
            <CardTitle className="text-2xl">{t('auth.signupTitle')}</CardTitle>
            <CardDescription>{t('auth.signupDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3">
                <Label>{t('auth.signupRoleLabel')}</Label>
                <RadioGroup value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                  <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="student" id="student" />
                    <Label htmlFor="student" className="flex items-center gap-2 cursor-pointer flex-1">
                      <User className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium">{t('auth.learn')}</div>
                        <div className="text-xs text-gray-600">{t('auth.learnDescription')}</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="teacher" id="teacher" />
                    <Label htmlFor="teacher" className="flex items-center gap-2 cursor-pointer flex-1">
                      <UserCog className="w-5 h-5 text-purple-600" />
                      <div>
                        <div className="font-medium">{t('auth.teach')}</div>
                        <div className="text-xs text-gray-600">{t('auth.teachDescription')}</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">{t('common.name')}</Label>
                <Input id="name" name="name" placeholder="Jungkook Jeon" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t('common.email')}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jungkook@linguafirst.com"
                  pattern="^[^@\s]+@linguafirst\.com$"
                  title={t('auth.emailDomainOnly')}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t('common.password')}</Label>
                <Input id="password" name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t('auth.confirmPassword')}</Label>
                <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} required />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? t('auth.signupLoading') : t('auth.signupSubmit')}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-center w-full text-gray-600">
              {t('auth.hasAccount')}{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                {t('auth.loginLink')}
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
