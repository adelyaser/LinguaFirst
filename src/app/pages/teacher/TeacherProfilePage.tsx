import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { User, Bell, CreditCard, Shield, Globe } from 'lucide-react';
import { toast } from 'sonner';

export default function TeacherProfilePage() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    country: 'United States',
    timezone: 'PST',
    bio: '',
  });

  const handleSave = () => {
    toast.success('Profile updated successfully!');
  };

  return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Профиль</h1>
        </div>

        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarFallback className="bg-blue-600 text-white text-2xl">
                    {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-gray-900 text-lg">{user?.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{user?.email}</p>
                <Badge className="bg-blue-600 text-white border-0 mb-4">Teacher</Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <Tabs defaultValue="account" className="w-full">
              <CardHeader>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="account">
                    <User className="w-4 h-4 mr-2" />
                    Аккаунт
                  </TabsTrigger>
                  <TabsTrigger value="billing">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Оплата
                  </TabsTrigger>
                  <TabsTrigger value="security">
                    <Shield className="w-4 h-4 mr-2" />
                    Безопасность
                  </TabsTrigger>
                </TabsList>
              </CardHeader>

              <CardContent className="pt-6">
                <TabsContent value="account" className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">ФИО</Label>
                      <Input
                          id="name"
                          value={profileData.name}
                          placeholder='Jungkook Jeon'
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          placeholder='jungkook@linguafirst.com'
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Номер телефона</Label>
                      <Input
                          id="phone"
                          type="tel"
                          placeholder="+7 (555) 123-4567"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <Button onClick={handleSave}>Сохранить изменения</Button>
                </TabsContent>

                {/* Billing Tab */}
                <TabsContent value="billing" className="space-y-6">
                  <div className="space-y-4">

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Способ оплаты</h4>
                      <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-8 h-8 text-gray-600" />
                          <div>
                            <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                            <p className="text-sm text-gray-600">Срок 12/28</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">История</h4>
                      <div className="space-y-2">
                        {[
                          { date: 'Апрель 7, 2026', amount: '$69.30', status: 'Оплачено' },
                          { date: 'Март 7, 2026', amount: '$99.00', status: 'Оплачено' },
                          { date: 'Февраль 7, 2026', amount: '$99.00', status: 'Оплачено' },
                        ].map((invoice, index) => (
                            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{invoice.date}</p>
                                <p className="text-xs text-gray-600">{invoice.status}</p>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="font-medium text-gray-900">{invoice.amount}</span>
                              </div>
                            </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className='bg-black text-white'>Добавить карту</Button>
                </TabsContent>
                <TabsContent value="security" className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Безопасность</h4>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Текущий пароль</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">Новый пароль</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Повторите новый пароль</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                        <Button onClick={() => toast.success('Password updated successfully!')}>
                          Обновить пароль
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </div>
  );
}
