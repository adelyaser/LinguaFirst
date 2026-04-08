import { teachers } from '../data/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Link } from 'react-router';
import { Star, Users, GraduationCap, Globe } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function TeachersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Meet Our Expert Teachers</h1>
            <p className="text-xl opacity-90">
              All our teachers are certified professionals with years of experience helping students achieve their English learning goals.
            </p>
          </div>
        </div>
      </section>

      {/* Filters - Could add functional filters here */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">All Teachers</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">IELTS Prep</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">Business English</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">Conversation</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">Kids & Teens</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">Grammar</Badge>
          </div>
        </div>
      </section>

      {/* Teachers Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachers.map((teacher, index) => (
              <Card key={teacher.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <ImageWithFallback
                      src={`https://i.pravatar.cc/150?img=${index + 10}`}
                      alt={teacher.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-1">{teacher.name}</CardTitle>
                      <CardDescription className="text-sm font-medium text-blue-600">
                        {teacher.specialty}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">{teacher.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{teacher.students} students</span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-gray-600">{teacher.bio}</p>

                  {/* Education */}
                  <div className="flex items-start gap-2 text-sm">
                    <GraduationCap className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{teacher.education}</span>
                  </div>

                  {/* Languages */}
                  <div className="flex items-start gap-2 text-sm">
                    <Globe className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex flex-wrap gap-2">
                      {teacher.languages.map((lang, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Experience Badge */}
                  <div className="pt-2">
                    <Badge variant="outline">{teacher.experience} experience</Badge>
                  </div>
                </CardContent>
                <div className="px-6 pb-6">
                  <Button className="w-full" asChild>
                    <Link to="/signup">Book a Lesson</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Teacher CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <GraduationCap className="w-16 h-16 text-blue-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Want to Teach with Us?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join our community of passionate educators and help students around the world master English
          </p>
          <Button size="lg" variant="outline" asChild>
            <Link to="/signup?role=teacher">Apply as Teacher</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
