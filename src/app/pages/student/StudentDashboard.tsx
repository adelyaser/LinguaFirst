import { studentProgress, upcomingLessons, courses } from '../../data/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Link } from 'react-router';
import { Clock, BookOpen, Trophy, Flame, Calendar, Video } from 'lucide-react';

export default function StudentDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back! 👋</h1>
        <p className="text-gray-600">Continue your English learning journey</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Level</CardTitle>
            <Trophy className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentProgress.currentLevel}</div>
            <p className="text-xs text-gray-600">Intermediate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentProgress.studyStreak} days</div>
            <p className="text-xs text-gray-600">Keep it up!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lessons Completed</CardTitle>
            <BookOpen className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentProgress.lessonsCompleted}</div>
            <p className="text-xs text-gray-600">of {studentProgress.totalLessons} total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hours Studied</CardTitle>
            <Clock className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentProgress.hoursStudied}h</div>
            <p className="text-xs text-gray-600">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
          <CardDescription>Your progress in the current course</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                {studentProgress.lessonsCompleted} of {studentProgress.totalLessons} lessons completed
              </span>
              <span className="font-medium">{studentProgress.overallProgress}%</span>
            </div>
            <Progress value={studentProgress.overallProgress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Lessons */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Upcoming Lessons</CardTitle>
            <CardDescription>Your scheduled classes this week</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/student/schedule">
              <Calendar className="w-4 h-4 mr-2" />
              View All
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingLessons.map((lesson) => (
              <div key={lesson.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Video className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{lesson.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">with {lesson.teacher}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(lesson.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{lesson.time}</span>
                      </div>
                      <Badge variant={lesson.type === 'individual' ? 'default' : 'secondary'} className="text-xs">
                        {lesson.type}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button asChild>
                  <Link to={lesson.link}>Join</Link>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Continue Learning */}
      <Card>
        <CardHeader>
          <CardTitle>Continue Learning</CardTitle>
          <CardDescription>Pick up where you left off</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {courses.slice(2, 4).map((course) => (
              <div key={course.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`w-12 h-12 ${course.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{course.title}</h4>
                  <p className="text-sm text-gray-600">{course.lessons} lessons</p>
                  <Progress value={45} className="h-1.5 mt-2" />
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/student/courses">Continue</Link>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}