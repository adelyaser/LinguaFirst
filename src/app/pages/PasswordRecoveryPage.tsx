import { useState } from 'react';
import { Link } from 'react-router';
import { CheckCircle2, GraduationCap } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

export default function PasswordRecoveryPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSuccess(true);
    toast.success(t('auth.resetSuccess'));
    setLoading(false);
  };

  const Header = () => (
    <div className="mb-8 flex items-center justify-between gap-4">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
          <GraduationCap className="w-7 h-7 text-white" />
        </div>
        <span className="text-2xl font-semibold text-gray-900">LinguaFirst</span>
      </Link>
      <LanguageSwitcher />
    </div>
  );

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Header />
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">{t('auth.checkEmail')}</CardTitle>
              <CardDescription>
                {t('auth.checkEmailDescription')} <strong>{email}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-gray-600">{t('auth.emailHelp')}</p>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button className="w-full" asChild>
                <Link to="/login">{t('auth.backToLogin')}</Link>
              </Button>
              <Button variant="outline" className="w-full" onClick={() => setSuccess(false)}>
                {t('auth.tryAnotherEmail')}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Header />
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">{t('auth.resetTitle')}</CardTitle>
            <CardDescription>{t('auth.resetDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('common.email')}</Label>
                <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? t('auth.resetLoading') : t('auth.resetSubmit')}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-center w-full text-gray-600">
              {t('auth.rememberPassword')}{' '}
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
