import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link } from 'react-router';
import { Target, Users, Award, Globe, Heart, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">About EnglishPro</h1>
            <p className="text-xl opacity-90 leading-relaxed">
              We're on a mission to make quality English education accessible to everyone, everywhere. Since 2015, we've helped over 50,000 students achieve their language learning goals.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-2">
              <CardContent className="pt-8">
                <Target className="w-12 h-12 text-blue-600 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed">
                  To empower individuals worldwide with English language skills that open doors to education, career opportunities, and global connections. We believe that language learning should be engaging, effective, and accessible to all.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-8">
                <Sparkles className="w-12 h-12 text-purple-600 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
                <p className="text-gray-600 leading-relaxed">
                  To become the world's most trusted online English learning platform, known for our innovative teaching methods, passionate educators, and proven student success stories.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  EnglishPro was founded in 2015 by a group of passionate educators who saw the need for high-quality, accessible English education online. What started as a small team of 5 teachers has grown into a global community of over 200 certified instructors serving students in 150+ countries.
                </p>
                <p>
                  We've always believed that learning English should be more than just memorizing grammar rules. It's about building confidence, making connections, and opening up a world of opportunities. That's why we focus on interactive, real-world communication skills that students can use immediately.
                </p>
                <p>
                  Today, we're proud to have helped thousands of students achieve their dreams – from passing IELTS exams to landing international jobs to studying at top universities worldwide.
                </p>
              </div>
            </div>
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758270704025-0e1a1793e1ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwc3R1ZGVudHMlMjBzdHVkeWluZ3xlbnwxfHx8fDE3NzU0NzE4ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Students learning together"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: 'Student-First',
                description: 'Every decision we make prioritizes student success and satisfaction',
              },
              {
                icon: Award,
                title: 'Excellence',
                description: 'We maintain the highest standards in teaching quality and materials',
              },
              {
                icon: Globe,
                title: 'Inclusivity',
                description: 'We celebrate diversity and welcome students from all backgrounds',
              },
              {
                icon: Users,
                title: 'Community',
                description: 'We build supportive relationships between students, teachers, and staff',
              },
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">EnglishPro by the Numbers</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">9+</div>
              <div className="text-gray-700 font-medium">Years of Experience</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">200+</div>
              <div className="text-gray-700 font-medium">Certified Teachers</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">50K+</div>
              <div className="text-gray-700 font-medium">Students Worldwide</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-orange-600 mb-2">150+</div>
              <div className="text-gray-700 font-medium">Countries Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Learning Community</h2>
          <p className="text-xl mb-8 opacity-90">
            Start your English learning journey with EnglishPro today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" asChild>
              <Link to="/teachers">Meet Our Teachers</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
