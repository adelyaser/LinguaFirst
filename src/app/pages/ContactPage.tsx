import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Mail, Phone, Video } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t('contactPage.sent'));
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">{t('contactPage.title')}</h1>
            <p className="text-xl opacity-90">{t('contactPage.description')}</p>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{t('contactPage.formTitle')}</CardTitle>
                  <CardDescription>{t('contactPage.formDescription')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t('common.name')}</Label>
                        <Input id="name" name="name" placeholder="Jungkook Jeon" value={formData.name} onChange={handleChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t('common.email')}</Label>
                        <Input id="email" name="email" type="email" placeholder="jungkook@example.com" value={formData.email} onChange={handleChange} required />
                      </div>
                    </div>
                    <Button type="submit" size="lg" className="w-full md:w-auto">
                      {t('contactPage.submit')} <ArrowRight />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>{t('contactPage.contactInfo')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600 text-sm">support@linguafirst.com</p>
                    <p className="text-gray-600 text-sm">info@linguafirst.com</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{t('contactPage.phone')}</h3>
                    <p className="text-gray-600 text-sm">+7 (555) 123-4567</p>
                    <p className="text-gray-600 text-sm">+7 (555) 987-6543</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-purple-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Video className="w-6 h-6 text-purple-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">IG & Tiktok</h3>
                    <p className="text-gray-600 text-sm">{t('contactPage.workHours')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('contactPage.faqTitle')}</h2>
          </div>
          <div className="space-y-6">
            {[
              ['contactPage.faq1Q', 'contactPage.faq1A'],
              ['contactPage.faq2Q', 'contactPage.faq2A'],
            ].map(([q, a]) => (
              <div key={q} className="border-b border-gray-200 pb-6 last:border-0">
                <h3 className="font-semibold text-gray-900 mb-2">{t(q)}</h3>
                <p className="text-gray-600">{t(a)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">{t('cta.title')}</h2>
          <p className="text-xl mb-8 opacity-90">{t('cta.description')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/signup">{t('cta.signup')} <ArrowRight /></Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" asChild>
              <Link to="/level-test">{t('cta.level')} <ArrowRight /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
