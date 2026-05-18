import { useAppData } from '../context/AppDataContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Link } from 'react-router';
import { Clock, BookOpen, ArrowRight } from 'lucide-react';

export default function CoursesPage() {
  const { courses } = useAppData();

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Наши программы</h1>
            <p className="text-xl opacity-90">
              Выберите свой уровень — от начального (A1) до продвинутого (C1). Наши курсы соответствуют стандартам Общеевропейской системы оценки знаний (CEFR).
            </p>
          </div>
        </div>
      </section>
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Понимание уровней CEFR</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Начальный уровень (A1–A2)</h3>
                <p className="text-sm text-gray-600">
                  Понимает и использует привычные повседневные выражения и простые фразы. Умеет представиться и задавать простые вопросы.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Продолжающий уровень (B1–B2)</h3>
                <p className="text-sm text-gray-600">
                  Способен справляться с большинством ситуаций. Может излагать свои мысли ясно и описывать свои впечатления, события и мнения.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Продвинутый уровень (C1-C2)</h3>
                <p className="text-sm text-gray-600">
                  Способен свободно и спонтанно выражать свои мысли. Способен создавать четкие, хорошо структурированные тексты на сложные темы.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <Badge className={`${course.color} text-white border-0`}>
                      {course.level}
                    </Badge>
                    <div className="text-2xl font-bold text-gray-900">${course.price}</div>
                  </div>
                  <CardTitle className="text-2xl">{course.title}</CardTitle>
                  <CardDescription className="text-base">{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <BookOpen className="w-4 h-4" />
                      <span>{course.lessons} {course.lessons === 24 ? 'урока' : 'занятия'}</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-semibold text-sm text-gray-900 mb-2">Вы изучите:</h4>
                    <ul className="space-y-1">
                      {course.skills.map((skill, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-green-600 mt-0.5">✓</span>
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link to="/signup">
                      Записаться <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Сомневаешься в выборе?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Пройди тест на определение уровня и мы подберм лучшее решенеие
          </p>
          <Button size="lg" asChild>
            <Link to="/level-test">Пройти тест <ArrowRight/></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
