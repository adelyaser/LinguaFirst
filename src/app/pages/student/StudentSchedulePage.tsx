import { useState } from 'react';
import { upcomingLessons } from '../../data/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Calendar as CalendarIcon, Clock, Video, Plus } from 'lucide-react';
import { Link } from 'react-router';

export default function StudentSchedulePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock calendar data
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
  const today = new Date().getDate();

  // Group lessons by date
  const lessonsByDate = upcomingLessons.reduce((acc, lesson) => {
    const date = new Date(lesson.date).getDate();
    if (!acc[date]) acc[date] = [];
    acc[date].push(lesson);
    return acc;
  }, {} as Record<number, typeof upcomingLessons>);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Schedule</h1>
          <p className="text-gray-600">Manage your lessons and upcoming classes</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Book a Lesson
        </Button>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        {/* Calendar View */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>April 2026</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {/* Empty cells for padding (April 2026 starts on Wednesday) */}
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {daysInMonth.map((day) => {
                  const hasLessons = lessonsByDate[day];
                  const isToday = day === today;
                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(new Date(2026, 3, day))}
                      className={`aspect-square p-2 rounded-lg text-sm font-medium transition-colors relative ${
                        isToday
                          ? 'bg-blue-600 text-white'
                          : hasLessons
                          ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {day}
                      {hasLessons && (
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                          {hasLessons.map((_, i) => (
                            <div
                              key={i}
                              className={`w-1 h-1 rounded-full ${
                                isToday ? 'bg-white' : 'bg-blue-600'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Lessons List */}
          <Card>
            <CardHeader>
              <CardTitle>All Upcoming Lessons</CardTitle>
              <CardDescription>Your scheduled classes for the next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Video className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{lesson.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">with {lesson.teacher}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <CalendarIcon className="w-4 h-4" />
                            <span>
                              {new Date(lesson.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{lesson.time}</span>
                          </div>
                          <Badge
                            variant={lesson.type === 'individual' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {lesson.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                      <Button size="sm" asChild>
                        <Link to={lesson.link}>Join</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Quick Actions & Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Book Individual Lesson
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Join Group Class
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Video className="w-4 h-4 mr-2" />
                Watch Recorded Lessons
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Lessons</span>
                  <span className="font-semibold">{upcomingLessons.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Study Hours</span>
                  <span className="font-semibold">2.5h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Next Lesson</span>
                  <span className="font-semibold text-blue-600">Tomorrow</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-gray-900 mb-2">Google Calendar Integration</h3>
              <p className="text-sm text-gray-600 mb-4">
                Sync your lessons with Google Calendar to never miss a class
              </p>
              <Button variant="outline" className="w-full">
                Connect Calendar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
