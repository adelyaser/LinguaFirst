import { Link } from 'react-router';
import { ArrowRight, GraduationCap, MapPin, TrendingUp, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppData } from '../context/AppDataContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function SuccessStoriesPage() {
  const { successStories } = useAppData();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">{t('successPage.title')}</h1>
            <p className="text-xl opacity-90">{t('successPage.description')}</p>
          </div>
        </div>
      </section>
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              ['8.0+', 'successPage.ielts', 'text-green-600'],
              ['500+', 'successPage.admissions', 'text-blue-600'],
              ['95%', 'successPage.rate', 'text-purple-600'],
              ['150+', 'successPage.countries', 'text-orange-600'],
            ].map(([value, label, color]) => (
              <div key={label}>
                <div className={`text-4xl font-bold mb-2 ${color}`}>{value}</div>
                <div className="text-gray-600">{t(label)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('successPage.featuredTitle')}</h2>
                <p className="text-lg text-gray-700 mb-6">{t('successPage.featuredText')}</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold">{t('successPage.featuredName')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span>Almaty {'->'} Oxford University</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <TrendingUp className="w-5 h-5 text-gray-400" />
                    <span>B2 {'->'} C1</span>
                  </div>
                </div>
              </div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1773921403832-aaeba299e510?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwc3VjY2VzcyUyMGNlbGVicmF0aW9ufGVufDF8fHx8MTc3NTUzMzkwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Success celebration"
                className="rounded-xl shadow-lg max-h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t('successPage.cases')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={story.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <ImageWithFallback src={`https://i.pravatar.cc/100?img=${index + 20}`} alt={story.name} className="w-16 h-16 rounded-full object-cover" />
                    <div>
                      <CardTitle className="text-lg">{story.name}</CardTitle>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="w-3 h-3" />
                        {story.country}
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-green-500 text-white border-0 w-fit">{story.achievement}</Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">{story.story}</p>
                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{t('successPage.progress')}</span>
                      <Badge variant="outline">{story.before} {'->'} {story.after}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{t('successPage.duration')}</span>
                      <span className="font-medium">{story.duration}</span>
                    </div>
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
          <h2 className="text-4xl font-bold mb-6">{t('cta.title')}</h2>
          <p className="text-xl mb-8 opacity-90">{t('cta.description')}</p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/signup">{t('cta.signup')} <ArrowRight /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
