import { UsersRound } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { useLearningDb } from '../../context/LearningDbContext';

const UNASSIGNED = 'unassigned';

export default function AdminAssignmentsPage() {
  const { teachers, students, loading, error, assignStudentToTeacher } = useLearningDb();

  const assignedCount = students.filter((student) => student.assignedTeacherId).length;

  const getTeacherName = (teacherId: string | null) => {
    if (!teacherId) {
      return 'Не назначен';
    }

    return teachers.find((teacher) => teacher.id === teacherId)?.name || 'Не назначен';
  };

  const handleAssign = async (studentId: string, teacherId: string) => {
    const nextTeacherId = teacherId === UNASSIGNED ? null : teacherId;
    try {
      await assignStudentToTeacher(studentId, nextTeacherId);
      toast.success('Назначение обновлено');
    } catch {
      toast.error('Не удалось сохранить назначение');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Управление учениками</h1>
        <p className="text-gray-600 mt-2">Назначайте учеников преподавателям и меняйте ответственного учителя.</p>
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

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ученики</CardTitle>
            <UsersRound className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-gray-600">всего в базе</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Назначены</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignedCount}</div>
            <p className="text-xs text-gray-600">есть закрепленный учитель</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Преподаватели</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teachers.length}</div>
            <p className="text-xs text-gray-600">доступны для назначения</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Закрепление учеников</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ученик</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Уровень</TableHead>
                <TableHead>Текущий учитель</TableHead>
                <TableHead className="w-[280px]">Назначить</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{student.level}</Badge>
                  </TableCell>
                  <TableCell>{getTeacherName(student.assignedTeacherId)}</TableCell>
                  <TableCell>
                    <Select
                      value={student.assignedTeacherId || UNASSIGNED}
                      onValueChange={(teacherId) => handleAssign(student.id, teacherId)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={UNASSIGNED}>Не назначен</SelectItem>
                        {teachers.map((teacher) => (
                          <SelectItem key={teacher.id} value={teacher.id}>
                            {teacher.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
