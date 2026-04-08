import { Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { CheckCircle2, Download } from 'lucide-react';

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center pb-0">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <CardTitle className="text-3xl">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6 pt-6">
          <p className="text-lg text-gray-600">
            Welcome to EnglishPro! Your account has been activated and you're ready to start learning.
          </p>

          <div className="bg-blue-50 rounded-lg p-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-4">What's Next?</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">
                  Complete your profile and set your learning goals
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">
                  Browse our course materials and start your first lesson
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">
                  Schedule your first live class with a teacher
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">
                  Join our community forum to connect with other students
                </span>
              </li>
            </ul>
          </div>

          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="text-sm text-gray-600">
              A confirmation email has been sent to your inbox with your receipt and account details.
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" asChild>
                <Link to="/student/dashboard">Go to Dashboard</Link>
              </Button>
              <Button size="lg" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Receipt
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
