import { Link } from 'react-router';
import { ArrowRight, Globe, GraduationCap, Star, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useLearningDb } from '../context/LearningDbContext';

export default function TeachersPage() {
  const { teachers, students, loading, error } = useLearningDb();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">{t('teachersPage.title')}</h1>
            <p className="text-xl opacity-90">{t('teachersPage.description')}</p>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && <div className="text-center text-gray-600">{t('teachersPage.loading')}</div>}
          {error && <div className="text-center text-red-600">{error}</div>}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachers.map((teacher, index) => (
              <Card key={teacher.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <ImageWithFallback src={`https://i.pravatar.cc/150?img=${index + 10}`} alt={teacher.name} className="w-20 h-20 rounded-full object-cover" />
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-1">{teacher.name}</CardTitle>
                      <CardDescription className="text-sm font-medium text-blue-600">{teacher.specialty}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Badge variant="outline">{teacher.specialty}</Badge>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">4.{(index % 3) + 7}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{students.filter((student) => student.assignedTeacherId === teacher.id).length} {t('teachersPage.students')}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{t('teachersPage.bio', { name: teacher.name })}</p>
                  <div className="flex items-start gap-2 text-sm">
                    <GraduationCap className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{teacher.email}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <Globe className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex flex-wrap gap-2">
                      {['English', 'Russian'].map((lang) => <Badge key={lang} variant="secondary" className="text-xs">{lang}</Badge>)}
                    </div>
                  </div>
                </CardContent>
                <div className="px-6 pb-6">
                  <Button className="w-full" asChild>
                    <Link to="/signup">{t('teachersPage.bookLesson')} <ArrowRight /></Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('coursesPage.unsureTitle')}</h2>
          <p className="text-lg text-gray-600 mb-8">{t('coursesPage.unsureText')}</p>
          <Button size="lg" asChild>
            <Link to="/level-test">{t('cta.test')} <ArrowRight /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
