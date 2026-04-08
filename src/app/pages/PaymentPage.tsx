import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { pricingPlans } from '../data/mockData';
import { CreditCard, Lock } from 'lucide-react';
import { toast } from 'sonner';

export default function PaymentPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const planId = searchParams.get('plan') || 'standard';
  const plan = pricingPlans.find((p) => p.id === planId) || pricingPlans[1];

  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock payment processing
    toast.success('Payment successful! Redirecting to dashboard...');
    setTimeout(() => {
      navigate('/payment/success');
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Purchase</h1>
          <p className="text-gray-600">Secure checkout powered by Stripe</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          {/* Payment Form */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>Enter your payment details to complete enrollment</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      required
                    />
                    <CreditCard className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    name="cardName"
                    placeholder="John Doe"
                    value={formData.cardName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      type="password"
                      maxLength={4}
                      value={formData.cvv}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 flex items-start gap-3">
                  <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-700">
                    <p className="font-medium mb-1">Secure Payment</p>
                    <p className="text-gray-600">
                      Your payment information is encrypted and secure. We never store your card details.
                    </p>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Pay ${plan.price} / {plan.period}
                </Button>

                <p className="text-xs text-center text-gray-600">
                  By confirming your purchase, you agree to our Terms of Service and Privacy Policy
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{plan.name} Plan</h3>
                    {plan.popular && (
                      <Badge className="bg-blue-600 text-white border-0">Popular</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{plan.description}</p>
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${plan.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (0%)</span>
                    <span className="font-medium">$0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">First Month Discount (30%)</span>
                    <span className="font-medium text-green-600">-${(plan.price * 0.3).toFixed(0)}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Total Due Today</span>
                    <span className="font-bold text-2xl text-gray-900">
                      ${(plan.price * 0.7).toFixed(0)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Then ${plan.price}/{plan.period} after trial
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-900 mb-3">What's Included:</h3>
                <ul className="space-y-2">
                  {plan.features.slice(0, 5).map((feature, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
