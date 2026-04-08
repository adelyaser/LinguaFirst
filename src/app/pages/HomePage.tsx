import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { ArrowRight, BookOpen, CheckCircle2, Globe, Users, Video, Star } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                🌟 Trusted by 50,000+ students worldwide
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Master English at Your Own Pace
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Learn from certified teachers with personalized lessons, interactive exercises, and real-time practice. From A1 to C1, we'll guide you every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="text-lg">
                  <Link to="/signup">
                    Start Learning Free <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg">
                  <Link to="/level-test">Take Level Test</Link>
                </Button>
              </div>
              <div className="flex items-center gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm text-gray-600">4.9/5 rating</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-semibold">12,000+</span> reviews
                </div>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1771408427146-09be9a1d4535?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMHN0dWRlbnQlMjBsYXB0b3B8ZW58MXx8fHwxNzc1NDQ1Mzk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Student learning online"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-600">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">200+</div>
              <div className="text-gray-600">Expert Teachers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">150+</div>
              <div className="text-gray-600">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Start your English learning journey in 3 simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Take a Level Test</h3>
              <p className="text-gray-600">
                Start with our free assessment to determine your current English level (A1-C1) and get personalized course recommendations.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Choose Your Teacher</h3>
              <p className="text-gray-600">
                Browse our certified teachers, read reviews, and select the perfect match for your learning style and goals.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Video className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Start Learning</h3>
              <p className="text-gray-600">
                Attend live video lessons, complete interactive exercises, and track your progress as you advance to fluency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose EnglishPro?</h2>
            <p className="text-xl text-gray-600">Everything you need to master English fluently</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Video, title: 'Live Video Lessons', desc: 'Face-to-face interaction with expert teachers in real-time' },
              { icon: BookOpen, title: 'Interactive Materials', desc: 'Engaging exercises, quizzes, and multimedia content' },
              { icon: Globe, title: 'Learn Anytime, Anywhere', desc: 'Access your lessons on any device, at your convenience' },
              { icon: CheckCircle2, title: 'Proven Methodology', desc: 'CEFR-aligned curriculum from A1 to C1 levels' },
              { icon: Users, title: 'Small Group Classes', desc: 'Maximum 6 students per class for personalized attention' },
              { icon: Star, title: 'Certified Teachers', desc: 'All teachers are TESOL/CELTA certified with 5+ years experience' },
            ].map((feature, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your English Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students who have achieved their language goals with EnglishPro
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="text-lg">
              <Link to="/signup">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg bg-transparent border-white text-white hover:bg-white/10">
              <Link to="/level-test">Take Level Test</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
