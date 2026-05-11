import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import {Mail, MapPin, Phone, Clock, ArrowRight, Video} from 'lucide-react';
import { toast } from 'sonner';
import {Link} from "react-router";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Сообщение отправлено! Мы свяжемся с вами в течение 24 часов.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Контакты</h1>
            <p className="text-xl opacity-90">
              Свяжитесь с нами, чтобы узнать больше о наших курсах, преподавателях и специальных предложениях. Мы всегда рады помочь вам начать свой путь к свободному владению английским!
            </p>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Оставьте заявку</CardTitle>
                  <CardDescription>
                    Заполните форму ниже, и наша команда свяжется с вами в течение 24 часов
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">ФИО</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Jungkook Jeon"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="JungkookJeon@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" size="lg" className="w-full md:w-auto">
                      Отправить <ArrowRight />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Mail className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <p className="text-gray-600 text-sm">support@linguafirst.com</p>
                      <p className="text-gray-600 text-sm">info@linguafirst.com</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Phone className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                      <p className="text-gray-600 text-sm">+7 (555) 123-4567</p>
                      <p className="text-gray-600 text-sm">+7 (555) 987-6543</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-purple-200 rounded-lg flex items-center justify-center">
                        <Video className="w-6 h-6 text-purple-700" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">IG & Tiktok</h3>
                      <p className="text-gray-600 text-sm">Понедельник — пятница: с 9:00 до 18:00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Часто задаваемые вопросы</h2>
          </div>
          <div className="space-y-6">
            {[
              {
                q: 'Как записаться на курс?',
                a: 'Просто создайте аккаунт, пройдите тест на определение уровня, чтобы определить свою стартовую точку, и выберите подходящий вам тарифный план. Вы можете начать обучение сразу же!',
              },
              {
                q: 'Можно ли сменить преподавателя?',
                a: 'Да! Вы можете просмотреть всех наших преподавателей и сменить их в любое время. Мы хотим, чтобы вы нашли преподавателя, который идеально подходит вашему стилю обучения.',
              },
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Начать обучение</h2>
          <p className="text-xl mb-8 opacity-90">
            Присоединяйся к 50.000 ученикам в изучении английского языка
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/signup">Записаться <ArrowRight/></Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" asChild>
              <Link to="/level-test">Узнать уровень <ArrowRight/></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
