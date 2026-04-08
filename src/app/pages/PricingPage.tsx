import { pricingPlans } from '../data/mockData';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Link } from 'react-router';
import { Check, X, Sparkles } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Choose the perfect plan for your learning journey. All plans include access to our world-class teachers and materials.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative ${
                  plan.popular
                    ? 'border-2 border-blue-500 shadow-xl scale-105'
                    : 'hover:shadow-lg'
                } transition-all`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white border-0 px-4 py-1">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Most Popular
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
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                    {plan.notIncluded.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 opacity-50">
                        <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-500">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.popular ? 'default' : 'outline'}
                    size="lg"
                    asChild
                  >
                    <Link to={`/payment?plan=${plan.id}`}>
                      {plan.popular ? 'Get Started' : 'Choose Plan'}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Compare Plans</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900">Basic</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900 bg-blue-50">Standard</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900">Premium</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Group Lessons/Month', basic: '4', standard: '8', premium: 'Unlimited' },
                  { feature: 'One-on-One Lessons/Month', basic: '0', standard: '2', premium: '8' },
                  { feature: 'Learning Materials', basic: 'Basic', standard: 'All', premium: 'All + Premium' },
                  { feature: 'Progress Tracking', basic: '✓', standard: '✓', premium: '✓' },
                  { feature: 'Homework Review', basic: '✗', standard: '✓', premium: '✓' },
                  { feature: 'Monthly Assessment', basic: '✗', standard: '✓', premium: 'Weekly' },
                  { feature: 'Certificate', basic: '✗', standard: '✗', premium: '✓' },
                  { feature: 'Priority Support', basic: '✗', standard: '✗', premium: '✓' },
                  { feature: 'Career Guidance', basic: '✗', standard: '✗', premium: '✓' },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-4 text-sm text-gray-700">{row.feature}</td>
                    <td className="py-4 px-4 text-center text-sm text-gray-700">{row.basic}</td>
                    <td className="py-4 px-4 text-center text-sm text-gray-700 bg-blue-50">{row.standard}</td>
                    <td className="py-4 px-4 text-center text-sm text-gray-700">{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'Can I change my plan later?',
                a: 'Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
              },
              {
                q: 'Is there a free trial?',
                a: 'Yes, we offer a 7-day free trial for all new students. No credit card required to start.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, PayPal, and bank transfers. All payments are secure and encrypted.',
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Absolutely! You can cancel your subscription at any time. No questions asked, no cancellation fees.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join 50,000+ students learning English with EnglishPro
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/signup">Start Your Free Trial</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
