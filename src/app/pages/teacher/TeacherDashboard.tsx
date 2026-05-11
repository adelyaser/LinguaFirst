import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {Calendar, Users, BookOpen, Clock, TrendingUp, Video, ArrowRight} from 'lucide-react';
import { Link } from 'react-router';

export default function TeacherDashboard() {
  // Mock data
  const upcomingClasses = [
    {
      id: '1',
      title: 'Lesson 19: Daily Routines',
      time: 'Апр 1 10:00',
      students: 5,
      type: 'групповые',
    },
    {
      id: '2',
      title: 'Lesson 18: Skin Care',
      time: 'Апр 3 10:00',
      students: 5,
      type: 'групповые',
    },
    {
      id: '3',
      title: 'One-on-One: Speaking Practice',
      time: 'Апр 6 10:00',
      students: 1,
      type: 'индивидуальные',
    },
  ];

  const recentStudents = [
    { name: 'Maria Santos', level: 'B2', progress: 78, lessons: 24 },
    { name: 'Ahmed Hassan', level: 'B1', progress: 65, lessons: 18 },
    { name: 'Yuki Tanaka', level: 'A2', progress: 45, lessons: 12 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Добро пожаловать снова!👋</h1>
        <p className="text-gray-600">Давайте продолжим наше путешествие в изучении английского</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Кол-во студентов</CardTitle>
            <Users className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-gray-600">5 активных студентов</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Проведено уроков</CardTitle>
            <Calendar className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-gray-600">Всего 45 уроков</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Проведено часов</CardTitle>
            <Clock className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,5ч</div>
            <p className="text-xs text-gray-600">01.02.2026 - 28.02.2026</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Предстоящие занятия</CardTitle>
            <CardDescription>Ваши занятия на этой неделе</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/teacher/schedule">Увидеть все <Calendar /></Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingClasses.map((classItem) => (
              <div
                key={classItem.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Video className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{classItem.title}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-gray-600">{classItem.time}</span>
                      <Badge
                        variant={classItem.type === 'individual' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {classItem.type}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm"><ArrowRight/></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
