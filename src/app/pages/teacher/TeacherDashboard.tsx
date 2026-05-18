import { Calendar, Clock, Users, Video, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { useAppData } from '../../context/AppDataContext';
import { useAuth } from '../../context/AuthContext';
import { useLearningDb } from '../../context/LearningDbContext';

export default function TeacherDashboard() {
  const { schedules } = useAppData();
  const { user } = useAuth();
  const { getStudentsForTeacher } = useLearningDb();

  const students = getStudentsForTeacher(user?.id || '');
  const completedLessons = schedules.filter((lesson) => lesson.status === 'completed').length;
  const scheduledHours = schedules.reduce((total, lesson) => total + lesson.duration / 60, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Teacher dashboard</h1>
        <p className="text-gray-600">Your students, lessons and upcoming schedule from the database.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
            <Users className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-gray-600">assigned by admin</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed lessons</CardTitle>
            <Calendar className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedLessons}</div>
            <p className="text-xs text-gray-600">saved in PostgreSQL</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled hours</CardTitle>
            <Clock className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scheduledHours.toFixed(1)}h</div>
            <p className="text-xs text-gray-600">upcoming workload</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Upcoming lessons</CardTitle>
            <CardDescription>Lessons loaded from the backend API.</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/teacher/schedule">View all <Calendar /></Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {schedules.map((classItem) => (
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
                      <span className="text-sm text-gray-600">{classItem.date} {classItem.time}</span>
                      <Badge variant={classItem.type === 'individual' ? 'default' : 'secondary'} className="text-xs">
                        {classItem.type}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button size="sm"><ArrowRight /></Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
