import { useState } from 'react';
import { Trash2, UsersRound } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { ConfirmModal } from '../../components/ConfirmModal';
import { DbTeacher, useLearningDb } from '../../context/LearningDbContext';

export default function AdminTeachersPage() {
  const { teachers, students, loading, error, deleteTeacher } = useLearningDb();
  const [teacherToDelete, setTeacherToDelete] = useState<DbTeacher | null>(null);
  const [deleting, setDeleting] = useState(false);

  const getAssignedStudentsCount = (teacherId: string) =>
    students.filter((student) => student.assignedTeacherId === teacherId).length;

  const handleDeleteTeacher = async () => {
    if (!teacherToDelete) return;

    setDeleting(true);
    try {
      await deleteTeacher(teacherToDelete.id);
      toast.success('Учитель удален');
      setTeacherToDelete(null);
    } catch (deleteError) {
      toast.error(deleteError instanceof Error ? deleteError.message : 'Не удалось удалить учителя');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Учителя</h1>
        <p className="text-gray-600 mt-2">Просматривайте список преподавателей и удаляйте ненужные аккаунты.</p>
      </div>

      {error && (
        <Card>
          <CardContent className="py-6 text-red-600">
            API сервер недоступен. Запустите `npm run server`.
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего учителей</CardTitle>
            <UsersRound className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teachers.length}</div>
            <p className="text-xs text-gray-600">активные аккаунты в базе</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Список учителей</CardTitle>
          <CardDescription>Удаление также отвязывает учеников от выбранного преподавателя.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-6 text-gray-600">Загрузка данных из базы...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Имя</TableHead>
                  <TableHead>Уровень</TableHead>
                  <TableHead>Специальность</TableHead>
                  <TableHead>Ученики</TableHead>
                  <TableHead className="w-[120px] text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell className="font-medium">{teacher.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{teacher.level}</Badge>
                    </TableCell>
                    <TableCell>{teacher.specialty}</TableCell>
                    <TableCell>{getAssignedStudentsCount(teacher.id)}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => setTeacherToDelete(teacher)}
                      >
                        <Trash2 />
                        Удалить
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {teachers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="py-8 text-center text-gray-600">
                      Учителей пока нет.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <ConfirmModal
        open={!!teacherToDelete}
        onOpenChange={(open) => {
          if (!open && !deleting) setTeacherToDelete(null);
        }}
        title="Удалить учителя?"
        description={`Учитель ${teacherToDelete?.name || ''} будет удален. Его ученики останутся в базе без назначенного преподавателя.`}
        confirmText={deleting ? 'Удаление...' : 'Удалить'}
        cancelText="Отмена"
        variant="destructive"
        onConfirm={handleDeleteTeacher}
      />
    </div>
  );
}
