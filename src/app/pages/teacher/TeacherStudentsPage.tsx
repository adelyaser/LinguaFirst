import { useState } from 'react';
import { Mail, Grid, List, Search } from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { Input } from '../../components/ui/input';
import { Progress } from '../../components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { useAuth } from '../../context/AuthContext';
import { useLearningDb } from '../../context/LearningDbContext';

export default function TeacherStudentsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const { user } = useAuth();
  const { loading, error, getStudentsForTeacher } = useLearningDb();

  const students = getStudentsForTeacher(user?.id || '');
  const filteredStudents = students.filter((student) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      student.name.toLowerCase().includes(query) || student.email.toLowerCase().includes(query);
    const matchesLevel = levelFilter === 'all' || student.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Мои студенты</h1>
        <p className="text-gray-600 mt-2">Список учеников, закрепленных администратором.</p>
      </div>

      {error && (
        <Card>
          <CardContent className="py-6 text-red-600">
            API сервер недоступен. Запустите `npm run server`.
          </CardContent>
        </Card>
      )}

      {loading && (
        <Card>
          <CardContent className="py-6 text-gray-600">
            Загрузка данных из базы...
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-9"
            placeholder="Поиск по имени или email"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все уровни</SelectItem>
              <SelectItem value="A1">A1</SelectItem>
              <SelectItem value="A2">A2</SelectItem>
              <SelectItem value="B1">B1</SelectItem>
              <SelectItem value="B2">B2</SelectItem>
              <SelectItem value="C1">C1</SelectItem>
            </SelectContent>
          </Select>
          <button
            className={`h-9 w-9 rounded-md border flex items-center justify-center ${viewMode === 'grid' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'}`}
            onClick={() => setViewMode('grid')}
            type="button"
            aria-label="Grid view"
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            className={`h-9 w-9 rounded-md border flex items-center justify-center ${viewMode === 'table' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'}`}
            onClick={() => setViewMode('table')}
            type="button"
            aria-label="Table view"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="py-10 text-center text-gray-600">
            Пока нет закрепленных учеников.
          </CardContent>
        </Card>
      )}

      {viewMode === 'grid' && filteredStudents.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student, index) => (
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
                      <Mail className="w-3 h-3" />
                      {student.email}
                    </div>
                  </div>
                </div>
                <Badge className={`${getLevelColor(student.level)} text-white border-0 w-fit`}>
                  {student.level}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Прогресс</span>
                    <span className="font-medium">{student.progress}%</span>
                  </div>
                  <Progress value={student.progress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {viewMode === 'table' && filteredStudents.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ученик</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Уровень</TableHead>
                  <TableHead>Прогресс</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{student.level}</Badge>
                    </TableCell>
                    <TableCell className="min-w-[180px]">
                      <div className="flex items-center gap-3">
                        <Progress value={student.progress} className="h-2" />
                        <span className="text-sm text-gray-600">{student.progress}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
