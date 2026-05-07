import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link } from 'react-router';
import {Target, Users, Award, Globe, Heart, Sparkles, ArrowRight} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Кто такие LinguaFirst</h1>
            <p className="text-xl opacity-90 leading-relaxed">
              Наша миссия — сделать качественное обучение английскому языку доступным для всех и везде. С 2015 года мы помогли более чем 50 000 студентов достичь своих целей в изучении языка.
            </p>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-2">
              <CardContent className="pt-8">
                <Target className="w-12 h-12 text-blue-600 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Наша миссия</h2>
                <p className="text-gray-600 leading-relaxed">
                  Мы хотим дать людям во всем мире возможность овладеть английским языком, что откроет им доступ к образованию, карьерным возможностям и международным связям. Мы убеждены, что изучение языка должно быть увлекательным, эффективным и доступным для всех.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-8">
                <Sparkles className="w-12 h-12 text-purple-600 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Наше виденье</h2>
                <p className="text-gray-600 leading-relaxed">
                  Стать самой авторитетной в мире онлайн-платформой для изучения английского языка, известной своими инновационными методами обучения, увлеченными преподавателями и подтвержденными историями успеха наших студентов.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Наша история</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Компания LinguaFirst была основана в 2015 году группой увлеченных педагогов, которые осознали необходимость в высококачественном и доступном онлайн-обучении английскому языку. Начав с небольшой команды из 5 преподавателей, мы превратились в глобальное сообщество, насчитывающее более 200 сертифицированных преподавателей, которые работают со студентами из более чем 150 стран.
                </p>
                <p>
                  Мы всегда считали, что изучение английского языка — это нечто большее, чем просто зазубривание грамматических правил. Это укрепление уверенности в себе, налаживание связей и открытие мира новых возможностей. Именно поэтому мы уделяем особое внимание развитию навыков интерактивного общения в реальных жизненных ситуациях, которые студенты могут применять сразу же.
                </p>
                <p>
                  Сегодня мы гордимся тем, что помогли тысячам студентов осуществить свои мечты — от сдачи экзаменов IELTS до получения работы за рубежом и обучения в ведущих университетах мира.
                </p>
              </div>
            </div>
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758270704025-0e1a1793e1ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwc3R1ZGVudHMlMjBzdHVkeWluZ3xlbnwxfHx8fDE3NzU0NzE4ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Students learning together"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Наша ценность</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: 'Ученики',
                description: 'В основе каждого нашего решения лежит стремление обеспечить успех и удовлетворенность студентов',
              },
              {
                icon: Award,
                title: 'Превосходство',
                description: 'Мы соблюдаем самые высокие стандарты качества преподавания и учебных материалов',
              },
              {
                icon: Globe,
                title: 'Знания',
                description: 'Лучшие методики, квалифицированные учителя',
              },
              {
                icon: Users,
                title: 'Коммуникация',
                description: 'Дружелюбные отношения между учащимися, учителями и сотрудниками',
              },
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">LinguaFirst в цифрах</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">50К</div>
              <div className="text-gray-700 font-medium">Активных студентов</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">200+</div>
              <div className="text-gray-700 font-medium">Квалифицированных учителей</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-gray-700 font-medium">Успешных кейсов</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-orange-600 mb-2">50+</div>
              <div className="text-gray-700 font-medium">Стран Мира</div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Начать обучение</h2>
          <p className="text-xl mb-8 opacity-90">
            Присоединяйся к 50.000 ученикам в изучении английского языка
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="text-lg">
              <Link to="/signup">Записаться <ArrowRight/></Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg bg-transparent border-white text-white hover:bg-white/10">
              <Link to="/level-test">Узнать уровень <ArrowRight/></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
