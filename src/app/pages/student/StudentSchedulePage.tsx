import { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {Calendar as CalendarIcon, Clock, Video, Plus, ArrowRight, ArrowLeft} from 'lucide-react';
import { Link } from 'react-router';

export default function StudentSchedulePage() {
  const { schedules: upcomingLessons } = useAppData();
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Мое расписание</h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Апрель 2026</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm"><ArrowLeft/></Button>
                    <Button variant="outline" size="sm"><ArrowRight/></Button>
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
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ближайшие события</CardTitle>
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
                          <Button size="sm" asChild>
                            <div><ArrowRight/></div>
                          </Button>
                        </div>
                      </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-900 mb-2">Google Calendar</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Синхронизируйте свои занятия с Google Календарем, чтобы никогда не пропустить урок
                </p>
                <Button variant="outline" className="w-full">
                  Синхронизировать с Google Calendar <CalendarIcon/>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  );
}
