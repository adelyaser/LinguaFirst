import { successStories } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Link } from 'react-router';
import {Trophy, TrendingUp, MapPin, GraduationCap, Briefcase, ArrowRight} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function SuccessStoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Наши ученики</h1>
            <p className="text-xl opacity-90">
              Настоящие студенты, настоящие результаты. Узнайте, как LinguaFirst помог тысячам людей осуществить мечту об обучении за границей, найти работу своей мечты и сдать IELTS с максимальными баллами.
            </p>
          </div>
        </div>
      </section>
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">8.0+</div>
              <div className="text-gray-600">Средний балл по IELTS</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Поступлений в университеты</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-gray-600">Процент поступивших</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">150+</div>
              <div className="text-gray-600">Стран в программе</div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  От уровня B2 до аспиранта Оксфордского университета
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  «Я никогда не думала, что смогу набрать 8,5 баллов по IELTS, но индивидуальный подход LinguaFirst и опытные преподаватели сделали это возможным. Занятия по разговорной практике оказались просто неоценимыми!»
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold">Акбота Кенжебекова</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span>Алматы → Oxford University</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <TrendingUp className="w-5 h-5 text-gray-400" />
                    <span>B2 → C1 за 5 месяцев</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1773921403832-aaeba299e510?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwc3VjY2VzcyUyMGNlbGVicmF0aW9ufGVufDF8fHx8MTc3NTUzMzkwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Success celebration"
                  className="rounded-xl shadow-lg max-h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Наши успешные кейсы</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={story.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <ImageWithFallback
                      src={`https://i.pravatar.cc/100?img=${index + 20}`}
                      alt={story.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <CardTitle className="text-lg">{story.name}</CardTitle>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="w-3 h-3" />
                        {story.country}
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-green-500 text-white border-0 w-fit">
                    {story.achievement}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">{story.story}</p>
                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progress:</span>
                      <Badge variant="outline">{story.before} → {story.after}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{story.duration}</span>
                    </div>
                    {story.university && (
                      <div className="flex items-start gap-2 text-sm mt-2">
                        <GraduationCap className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{story.university}</span>
                      </div>
                    )}
                    {story.destination && (
                      <div className="flex items-start gap-2 text-sm mt-2">
                        <MapPin className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{story.destination}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Trophy className="w-16 h-16 mx-auto mb-6" />
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
