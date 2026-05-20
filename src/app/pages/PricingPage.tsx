import { Link } from 'react-router';
import { ArrowRight, Check, Sparkles, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppData } from '../context/AppDataContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

export default function PricingPage() {
  const { pricingPlans } = useAppData();
  const { t } = useTranslation();
  const comparisonRows = t('pricingPage.comparisonRows', { returnObjects: true }) as string[];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">{t('pricingPage.title')}</h1>
          <p className="text-xl opacity-90">{t('pricingPage.description')}</p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan) => (
              <Card key={plan.id} className={`relative ${plan.popular ? 'border-2 border-blue-500 shadow-xl scale-105' : 'hover:shadow-lg'} transition-all`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white border-0 px-4 py-1">
                      <Sparkles className="w-3 h-3 mr-1" />
                      {t('pricingPage.mostPopular')}
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <CardDescription className="text-base mb-4">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                    {plan.notIncluded.map((feature) => (
                      <div key={feature} className="flex items-start gap-3 opacity-50">
                        <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-500">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={plan.popular ? 'default' : 'outline'} size="lg" asChild>
                    <Link to={`/payment?plan=${plan.id}`}>{plan.popular ? t('pricingPage.getStarted') : t('pricingPage.choosePlan')}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t('pricingPage.compare')}</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">{t('pricingPage.feature')}</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900">{t('pricingPage.basic')}</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900 bg-blue-50">{t('pricingPage.standard')}</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900">{t('pricingPage.premium')}</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((feature, index) => (
                  <tr key={feature} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-4 text-sm text-gray-700">{feature}</td>
                    <td className="py-4 px-4 text-center text-sm text-gray-700">{index < 3 ? ['4', '0', t('pricingPage.basic')][index] : index < 4 ? '✓' : '✕'}</td>
                    <td className="py-4 px-4 text-center text-sm text-gray-700 bg-blue-50">{index < 3 ? ['8', '2', t('common.all')][index] : index < 6 ? '✓' : index === 6 ? '✕' : '✕'}</td>
                    <td className="py-4 px-4 text-center text-sm text-gray-700">{index === 0 ? t('pricingPage.unlimited') : index === 1 ? '8' : '✓'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">{t('cta.title')}</h2>
          <p className="text-xl mb-8 opacity-90">{t('cta.description')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/signup">{t('cta.signup')} <ArrowRight /></Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" asChild>
              <Link to="/level-test">{t('cta.level')} <ArrowRight /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
