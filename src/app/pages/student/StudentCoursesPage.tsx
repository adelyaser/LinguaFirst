import { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Link } from 'react-router';
import {ArrowRight, BookOpen, CheckCircle2, Lock, Play} from 'lucide-react';

export default function StudentCoursesPage() {
  const { courses, lessons, progress } = useAppData();
  const [activeTab, setActiveTab] = useState('in-progress');

  const enrolledCourse = courses.find((course) => course.id === progress?.currentLevel.toLowerCase()) || courses[2] || courses[0];
  const lessonsWithProgress = lessons.map((lesson, idx) => ({
    ...lesson,
    locked: idx > Math.max(2, progress?.lessonsCompleted || 0),
  }));

  if (!enrolledCourse) {
    return <div className="text-gray-600">Loading courses...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Мои курсы</h1>
        <p className="text-gray-600">Уроки и отслеживание прогресса</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {courses.slice(2, 4).map((course) => (
            <div key={course.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className={`w-12 h-12 ${course.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{course.title}</h4>
                <p className="text-sm text-gray-600">{course.lessons} урока</p>
                <Progress value={45} className="h-1.5 mt-2" />
              </div>
              <Button asChild>
                <div><ArrowRight/></div>
              </Button>
            </div>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>

        <TabsContent value="in-progress" className="space-y-6 mt-6">
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
                  <span className="text-gray-600">18 / 32 уроков выполнено</span>
                  <span className="font-medium">65%</span>
                </div>
                <Progress value={65} className="h-3" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
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
                <Link to="/student/lesson/3">Начать <ArrowRight/></Link>
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
