import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Calendar, Users, BookOpen, Clock, TrendingUp, Video } from 'lucide-react';
import { Link } from 'react-router';

export default function TeacherDashboard() {
  // Mock data
  const upcomingClasses = [
    {
      id: '1',
      title: 'B1 Grammar Workshop',
      time: 'Today at 2:00 PM',
      students: 5,
      type: 'group',
    },
    {
      id: '2',
      title: 'One-on-One: Maria',
      time: 'Today at 4:30 PM',
      students: 1,
      type: 'individual',
    },
    {
      id: '3',
      title: 'Conversation Practice',
      time: 'Tomorrow at 10:00 AM',
      students: 6,
      type: 'group',
    },
  ];

  const recentStudents = [
    { name: 'Maria Santos', level: 'B2', progress: 78, lessons: 24 },
    { name: 'Ahmed Hassan', level: 'B1', progress: 65, lessons: 18 },
    { name: 'Yuki Tanaka', level: 'A2', progress: 45, lessons: 12 },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Teacher Dashboard 👨‍🏫</h1>
        <p className="text-gray-600">Manage your lessons and track student progress</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-gray-600">+5 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classes Today</CardTitle>
            <Calendar className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-gray-600">3 group, 3 individual</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hours This Week</CardTitle>
            <Clock className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18.5h</div>
            <p className="text-xs text-gray-600">+2.5h from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.9</div>
            <p className="text-xs text-gray-600">Based on 124 reviews</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Classes */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Upcoming Classes</CardTitle>
            <CardDescription>Your schedule for today and tomorrow</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/teacher/schedule">View All</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingClasses.map((classItem) => (
              <div
                key={classItem.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Video className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{classItem.title}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-gray-600">{classItem.time}</span>
                      <Badge
                        variant={classItem.type === 'individual' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {classItem.students} {classItem.students === 1 ? 'student' : 'students'}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Prepare
                  </Button>
                  <Button size="sm">Start Class</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Students */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Students</CardTitle>
            <CardDescription>Students you've taught recently</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentStudents.map((student, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-blue-700">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-600">
                        {student.level} • {student.lessons} lessons
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{student.progress}%</div>
                    <div className="text-xs text-gray-600">Progress</div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link to="/teacher/students">View All Students</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and tools</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link to="/teacher/lessons">
                <BookOpen className="w-4 h-4 mr-2" />
                Create New Lesson
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link to="/teacher/schedule">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Class
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="w-4 h-4 mr-2" />
              Message Students
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <TrendingUp className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
