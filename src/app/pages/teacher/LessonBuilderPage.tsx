import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '../../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  Plus, GripVertical, Trash2, Eye, Save, Video, FileText, HelpCircle, Link as LinkIcon, Image as ImageIcon,
  ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';
import { useAppData } from '../../context/AppDataContext';

interface ContentBlock {
  id: string;
  type: 'video' | 'text' | 'quiz' | 'image';
  content: any;
}

const ITEM_TYPE = 'CONTENT_BLOCK';

function DraggableBlock({ block, index, moveBlock, removeBlock, editBlock }: any) {
  const [{ isDragging }, drag, preview] = useDrag({
    type: ITEM_TYPE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveBlock(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const getIcon = () => {
    switch (block.type) {
      case 'video': return <Video className="w-5 h-5" />;
      case 'text': return <FileText className="w-5 h-5" />;
      case 'quiz': return <HelpCircle className="w-5 h-5" />;
      case 'image': return <ImageIcon className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getTitle = () => {
    switch (block.type) {
      case 'video': return block.content.title || 'Видео';
      case 'text': return block.content.title || 'Текст';
      case 'quiz': return block.content.question || 'Викторина';
      case 'image': return 'Картинка';
      default: return 'Контент';
    }
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`flex items-center gap-3 p-4 bg-white border rounded-lg cursor-move transition-opacity ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <GripVertical className="w-5 h-5 text-gray-400" />
      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
        {getIcon()}
      </div>
      <div className="flex-1">
        <div className="font-medium text-gray-900">{getTitle()}</div>
        <div className="text-sm text-gray-500 capitalize">{block.type} Block</div>
      </div>
      <Button variant="ghost" size="sm" onClick={() => removeBlock(index)}>
        <Trash2 className="w-4 h-4 text-red-600" />
      </Button>
      <Button className='bg-black'>
        <ArrowRight className='text-white' />
      </Button>
    </div>
  );
}

export default function LessonBuilderPage() {
  const { createLesson } = useAppData();
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonLevel, setLessonLevel] = useState('B1');
  const [lessonDuration, setLessonDuration] = useState('60');
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [showAddBlock, setShowAddBlock] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [editingBlock, setEditingBlock] = useState<ContentBlock | null>(null);

  const moveBlock = (fromIndex: number, toIndex: number) => {
    const updatedBlocks = [...contentBlocks];
    const [movedBlock] = updatedBlocks.splice(fromIndex, 1);
    updatedBlocks.splice(toIndex, 0, movedBlock);
    setContentBlocks(updatedBlocks);
  };

  const addBlock = (type: ContentBlock['type']) => {
    const newBlock: ContentBlock = {
      id: Date.now().toString(),
      type,
      content: type === 'quiz' 
        ? { question: '', options: ['', '', '', ''], correct: 0 }
        : type === 'video'
        ? { title: '', url: '' }
        : type === 'text'
        ? { title: '', content: '' }
        : { url: '' },
    };
    setContentBlocks([...contentBlocks, newBlock]);
    setEditingBlock(newBlock);
    setShowAddBlock(false);
  };

  const removeBlock = (index: number) => {
    setContentBlocks(contentBlocks.filter((_, i) => i !== index));
  };

  const editBlock = (block: ContentBlock) => {
    setEditingBlock(block);
  };

  const saveEditingBlock = () => {
    if (editingBlock) {
      setContentBlocks(contentBlocks.map(b => b.id === editingBlock.id ? editingBlock : b));
      setEditingBlock(null);
    }
  };

  const saveLesson = async () => {
    if (!lessonTitle) {
      toast.error('Please add a lesson title');
      return;
    }
    if (contentBlocks.length === 0) {
      toast.error('Please add at least one content block');
      return;
    }
    try {
      await createLesson({
        title: lessonTitle,
        courseId: lessonLevel.toLowerCase(),
        duration: Number(lessonDuration),
        description: `${lessonLevel} lesson`,
        exercises: contentBlocks
          .filter((block) => block.type === 'quiz')
          .map((block) => ({
            type: 'multiple-choice',
            question: block.content.question,
            options: block.content.options,
            correct: block.content.correct,
          })),
        videoUrl: contentBlocks.find((block) => block.type === 'video')?.content.url || '',
      });
      toast.success('Lesson saved successfully!');
      setLessonTitle('');
      setContentBlocks([]);
    } catch {
      toast.error('Failed to save lesson');
    }
  };

  const saveAsTemplate = () => {
    if (!lessonTitle) {
      toast.error('Please add a lesson title');
      return;
    }
    toast.success('Lesson saved as template!');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Конструктор урока</h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Детали</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Заголовок</Label>
                  <Input
                    id="title"
                    placeholder="Jungkook Jeon"
                    value={lessonTitle}
                    onChange={(e) => setLessonTitle(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="level">Уровень</Label>
                    <Select value={lessonLevel} onValueChange={setLessonLevel}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A1">A1 - Beginner</SelectItem>
                        <SelectItem value="A2">A2 - Elementary</SelectItem>
                        <SelectItem value="B1">B1 - Intermediate</SelectItem>
                        <SelectItem value="B2">B2 - Upper Intermediate</SelectItem>
                        <SelectItem value="C1">C1 - Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="duration">Продолжительность</Label>
                    <Select value={lessonDuration} onValueChange={setLessonDuration}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 минут</SelectItem>
                        <SelectItem value="45">45 минут</SelectItem>
                        <SelectItem value="60">60 минут</SelectItem>
                        <SelectItem value="90">90 минут</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Содержание</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {contentBlocks.length > 0 ? (
                  <div className="space-y-3">
                    {contentBlocks.map((block, index) => (
                          <DraggableBlock
                              key={block.id}
                              block={block}
                              index={index}
                              moveBlock={moveBlock}
                              removeBlock={removeBlock}
                              editBlock={editBlock}
                          />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Пока нет блоков с заданиями</p>
                  </div>
                )}
                <Button onClick={() => setShowAddBlock(true)}>
                  Добавить блок
                  <Plus className="w-4 h-4 mr-2" />
                </Button>
              </CardContent>
            </Card>
            <Button onClick={saveLesson}>
              Сохранить
              <Save className="w-4 h-4 mr-2" />
            </Button>
          </div>
        </div>
        <Dialog open={showAddBlock} onOpenChange={setShowAddBlock}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Добавить блок</DialogTitle>
              <DialogDescription>Выберите тип контента</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => addBlock('video')}
                className="p-6 border-2 border-gray-200 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition-colors text-center"
              >
                <Video className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <div className="font-medium">Видео</div>
                <div className="text-xs text-gray-500 mt-1">Добавить видео урок</div>
              </button>
              <button
                onClick={() => addBlock('text')}
                className="p-6 border-2 border-gray-200 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition-colors text-center"
              >
                <FileText className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <div className="font-medium">Текст</div>
                <div className="text-xs text-gray-500 mt-1">Добавить текст</div>
              </button>
              <button
                onClick={() => addBlock('quiz')}
                className="p-6 border-2 border-gray-200 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition-colors text-center"
              >
                <HelpCircle className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <div className="font-medium">Викторина</div>
                <div className="text-xs text-gray-500 mt-1">Добавить вопросы и ответы</div>
              </button>
              <button
                onClick={() => addBlock('image')}
                className="p-6 border-2 border-gray-200 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition-colors text-center"
              >
                <ImageIcon className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <div className="font-medium">Изображение</div>
                <div className="text-xs text-gray-500 mt-1">Добавить изображение</div>
              </button>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog open={!!editingBlock} onOpenChange={() => setEditingBlock(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Добавить {editingBlock?.type.charAt(0).toUpperCase() + editingBlock?.type.slice(1)}</DialogTitle>
            </DialogHeader>
            {editingBlock && (
              <div className="space-y-4">
                {editingBlock.type === 'video' && (
                  <>
                    <div>
                      <Label>Заголовок</Label>
                      <Input
                        value={editingBlock.content.title}
                        onChange={(e) => setEditingBlock({
                          ...editingBlock,
                          content: { ...editingBlock.content, title: e.target.value }
                        })}
                        placeholder="Введите заголовок"
                      />
                    </div>
                    <div>
                      <Label>Видео</Label>
                      <Input
                        value={editingBlock.content.url}
                        onChange={(e) => setEditingBlock({
                          ...editingBlock,
                          content: { ...editingBlock.content, url: e.target.value }
                        })}
                        placeholder="https://..."
                      />
                    </div>
                  </>
                )}
                
                {editingBlock.type === 'text' && (
                  <>
                    <div>
                      <Label>Заголовок</Label>
                      <Input
                        value={editingBlock.content.title}
                        onChange={(e) => setEditingBlock({
                          ...editingBlock,
                          content: { ...editingBlock.content, title: e.target.value }
                        })}
                        placeholder="Введите заголовок"
                      />
                    </div>
                    <div>
                      <Label>Content</Label>
                      <Textarea
                        value={editingBlock.content.content}
                        onChange={(e) => setEditingBlock({
                          ...editingBlock,
                          content: { ...editingBlock.content, content: e.target.value }
                        })}
                        rows={6}
                        placeholder="Введите содержание"
                      />
                    </div>
                  </>
                )}

                {editingBlock.type === 'quiz' && (
                  <>
                    <div>
                      <Label>Вопрос</Label>
                      <Input
                        value={editingBlock.content.question}
                        onChange={(e) => setEditingBlock({
                          ...editingBlock,
                          content: { ...editingBlock.content, question: e.target.value }
                        })}
                        placeholder="Введите вопрос"
                      />
                    </div>
                    {editingBlock.content.options.map((option: string, i: number) => (
                      <div key={i}>
                        <Label>Ответ {i + 1}</Label>
                        <div className="flex gap-2">
                          <Input
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...editingBlock.content.options];
                              newOptions[i] = e.target.value;
                              setEditingBlock({
                                ...editingBlock,
                                content: { ...editingBlock.content, options: newOptions }
                              });
                            }}
                            placeholder={`Ответ ${i + 1}`}
                          />
                          <Button
                            variant={editingBlock.content.correct === i ? 'default' : 'outline'}
                            onClick={() => setEditingBlock({
                              ...editingBlock,
                              content: { ...editingBlock.content, correct: i }
                            })}
                          >
                            {editingBlock.content.correct === i ? '✓ Правильный' : 'Выбрать как правильный'}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {editingBlock.type === 'image' && (
                  <div>
                    <Label>Заголовок</Label>
                    <Input
                      value={editingBlock.content.url}
                      onChange={(e) => setEditingBlock({
                        ...editingBlock,
                        content: { ...editingBlock.content, url: e.target.value }
                      })}
                      placeholder="https://..."
                    />
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingBlock(null)}>Отмена</Button>
              <Button onClick={saveEditingBlock}>Сохранить <ArrowRight/></Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DndProvider>
  );
}
