import { useState } from 'react';
import { courses, mockLessons } from '../../data/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Link } from 'react-router';
import { BookOpen, CheckCircle2, Lock, Play } from 'lucide-react';

export default function StudentCoursesPage() {
  const [activeTab, setActiveTab] = useState('in-progress');

  // Mock data for enrolled courses
  const enrolledCourse = courses[2]; // B1 Intermediate
  const lessonsWithProgress = mockLessons.map((lesson, idx) => ({
    ...lesson,
    completed: idx < 2,
    locked: idx > 2,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
        <p className="text-gray-600">Track your progress and continue learning</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All Courses</TabsTrigger>
        </TabsList>

        <TabsContent value="in-progress" className="space-y-6 mt-6">
          {/* Current Course */}
          <Card className="border-2 border-blue-500">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <Badge className={`${enrolledCourse.color} text-white border-0 mb-2`}>
                    {enrolledCourse.level}
                  </Badge>
                  <CardTitle className="text-2xl">{enrolledCourse.title}</CardTitle>
                  <CardDescription className="text-base mt-2">
                    {enrolledCourse.description}
                  </CardDescription>
                </div>
              </div>
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Course Progress</span>
                  <span className="font-medium">18 of 32 lessons (56%)</span>
                </div>
                <Progress value={56} className="h-3" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-6">
                <div className="text-sm text-gray-600">
                  <BookOpen className="w-4 h-4 inline mr-1" />
                  {enrolledCourse.lessons} total lessons
                </div>
                <div className="text-sm text-gray-600">
                  Duration: {enrolledCourse.duration}
                </div>
              </div>

              {/* Lessons List */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 mb-4">Recent Lessons</h3>
                {lessonsWithProgress.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className={`flex items-center justify-between p-4 border rounded-lg ${
                      lesson.locked
                        ? 'bg-gray-50 opacity-60'
                        : 'hover:bg-gray-50 cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          lesson.completed
                            ? 'bg-green-100'
                            : lesson.locked
                            ? 'bg-gray-200'
                            : 'bg-blue-100'
                        }`}
                      >
                        {lesson.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        ) : lesson.locked ? (
                          <Lock className="w-5 h-5 text-gray-500" />
                        ) : (
                          <Play className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          Lesson {index + 1}: {lesson.title}
                        </div>
                        <div className="text-sm text-gray-600">{lesson.duration} minutes</div>
                      </div>
                    </div>
                    {!lesson.locked && (
                      <Button variant={lesson.completed ? 'outline' : 'default'} size="sm" asChild>
                        <Link to={`/student/lesson/${lesson.id}`}>
                          {lesson.completed ? 'Review' : 'Start'}
                        </Link>
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <Button className="w-full mt-6" size="lg" asChild>
                <Link to="/student/lesson/3">Continue Learning</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <Card>
            <CardContent className="py-12 text-center">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No completed courses yet</h3>
              <p className="text-gray-600">
                Keep learning to complete your first course!
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Badge className={`${course.color} text-white border-0 w-fit`}>
                    {course.level}
                  </Badge>
                  <CardTitle className="text-xl mt-2">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="text-sm text-gray-600">
                      {course.lessons} lessons • {course.duration}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/pricing">Enroll Now</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
