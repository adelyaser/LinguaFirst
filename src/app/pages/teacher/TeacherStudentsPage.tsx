import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Progress } from '../../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import {
  Search,
  Filter,
  Grid,
  List,
  Calendar,
  Mail,
  TrendingUp,
  BookOpen,
  User,
  MapPin,
  GraduationCap
} from 'lucide-react';
import { Link } from 'react-router';
import {successStories, teacherStudents} from '../../data/mockData';
import { format } from 'date-fns';
import {ImageWithFallback} from "../../components/figma/ImageWithFallback";

export default function TeacherStudentsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');


  const getLevelColor = (level: string) => {
    switch (level) {
      case 'A1':
        return 'bg-green-500';
      case 'A2':
        return 'bg-blue-500';
      case 'B1':
        return 'bg-purple-500';
      case 'B2':
        return 'bg-orange-500';
      case 'C1':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Мои студенты</h1>
      </div>
      {viewMode === 'grid' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {successStories.map((student, index) => (
              <Card key={student.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <ImageWithFallback
                        src={`https://i.pravatar.cc/100?img=${index + 20}`}
                        alt={student.name}
                        className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <CardTitle className="text-lg">{student.name}</CardTitle>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="w-3 h-3" />
                        {student.country}
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-green-500 text-white border-0 w-fit">
                    {student.achievement}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">{student.story}</p>
                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progress:</span>
                      <Badge variant="outline">{student.before} → {student.after}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{student.duration}</span>
                    </div>
                    {student.university && (
                        <div className="flex items-start gap-2 text-sm mt-2">
                          <GraduationCap className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{student.university}</span>
                        </div>
                    )}
                    {student.destination && (
                        <div className="flex items-start gap-2 text-sm mt-2">
                          <MapPin className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{student.destination}</span>
                        </div>
                    )}
                  </div>
                </CardContent>
              </Card>
          ))}
        </div>
      )}

    </div>
  );
}
