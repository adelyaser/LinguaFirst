import { Link } from 'react-router';
import { ArrowRight, Award, Globe, Heart, Sparkles, Target, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function AboutPage() {
  const { t } = useTranslation();
  const values = t('aboutPage.valueItems', { returnObjects: true }) as string[][];
  const icons = [Heart, Award, Globe, Users];

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">{t('aboutPage.title')}</h1>
            <p className="text-xl opacity-90 leading-relaxed">{t('aboutPage.description')}</p>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-2">
              <CardContent className="pt-8">
                <Target className="w-12 h-12 text-blue-600 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('aboutPage.mission')}</h2>
                <p className="text-gray-600 leading-relaxed">{t('aboutPage.missionText')}</p>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardContent className="pt-8">
                <Sparkles className="w-12 h-12 text-purple-600 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('aboutPage.vision')}</h2>
                <p className="text-gray-600 leading-relaxed">{t('aboutPage.visionText')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('aboutPage.history')}</h2>
              <p className="text-gray-600 leading-relaxed">{t('aboutPage.historyText')}</p>
            </div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1758270704025-0e1a1793e1ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwc3R1ZGVudHMlMjBzdHVkeWluZ3xlbnwxfHx8fDE3NzU0NzE4ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Students learning together"
              className="rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('aboutPage.values')}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map(([title, description], index) => {
              const Icon = icons[index];
              return (
                <div key={title} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-600">{description}</p>
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
