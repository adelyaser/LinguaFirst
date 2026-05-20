import { Link } from 'react-router';
import { ArrowRight, BookOpen, CheckCircle2, Globe, Star, Users, Video } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function HomePage() {
  const { t } = useTranslation();
  const features = [
    { icon: Video, key: 'live' },
    { icon: BookOpen, key: 'materials' },
    { icon: Globe, key: 'global' },
    { icon: CheckCircle2, key: 'groups' },
    { icon: Users, key: 'teachers' },
    { icon: Star, key: 'anytime' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                {t('homePage.badge')}
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">{t('homePage.title')}</h1>
              <p className="text-xl text-gray-600 mb-8">{t('homePage.description')}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="text-lg">
                  <Link to="/signup">{t('homePage.chooseCourse')} <ArrowRight className="ml-2 w-5 h-5" /></Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg">
                  <Link to="/level-test">{t('homePage.levelTest')}</Link>
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm text-gray-600">{t('homePage.rating')}</span>
                </div>
                <div className="text-sm text-gray-600">{t('homePage.reviews')}</div>
              </div>
            </div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1771408427146-09be9a1d4535?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMHN0dWRlbnQlMjBsYXB0b3B8ZW58MXx8fHwxNzc1NDQ1Mzk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Student learning online"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              ['50K+', 'homePage.activeStudents', 'text-blue-600'],
              ['200+', 'homePage.qualifiedTeachers', 'text-purple-600'],
              ['95%', 'homePage.successCases', 'text-green-600'],
              ['150+', 'homePage.countries', 'text-orange-600'],
            ].map(([value, label, color]) => (
              <div key={label} className="text-center">
                <div className={`text-4xl font-bold mb-2 ${color}`}>{value}</div>
                <div className="text-gray-600">{t(label)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('homePage.howTitle')}</h2>
            <p className="text-xl text-gray-600">{t('homePage.howSubtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              [BookOpen, 'step1Title', 'step1Description', 'bg-blue-100', 'text-blue-600'],
              [Users, 'step2Title', 'step2Description', 'bg-purple-100', 'text-purple-600'],
              [Video, 'step3Title', 'step3Description', 'bg-green-100', 'text-green-600'],
            ].map(([Icon, title, description, bg, color]) => (
              <div key={title as string} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-14 h-14 ${bg} rounded-full flex items-center justify-center mb-6`}>
                  <Icon className={`w-7 h-7 ${color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t(`homePage.${title}`)}</h3>
                <p className="text-gray-600">{t(`homePage.${description}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('homePage.whyTitle')}</h2>
            <p className="text-xl text-gray-600">{t('homePage.whySubtitle')}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, key }) => {
              const value = t(`homePage.features.${key}`, { returnObjects: true }) as string[];
              return (
                <div key={key} className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{value[0]}</h3>
                    <p className="text-gray-600 text-sm">{value[1]}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">{t('cta.title')}</h2>
          <p className="text-xl mb-8 opacity-90">{t('cta.description')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="text-lg">
              <Link to="/signup">{t('cta.signup')} <ArrowRight /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg bg-transparent border-white text-white hover:bg-white/10">
              <Link to="/level-test">{t('cta.level')} <ArrowRight /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
