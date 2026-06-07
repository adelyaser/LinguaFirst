import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { useAppData } from '../../context/AppDataContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {ArrowLeft, ArrowRight, CheckCircle2} from 'lucide-react';
import { toast } from 'sonner';

export default function StudentLessonPage() {
  const { lessonId } = useParams();
  const { lessons, completeLesson } = useAppData();
  const lesson = lessons.find((l) => l.id === lessonId) || lessons[0];

  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);

  const exercises = lesson?.exercises || [];

  if (!lesson || exercises.length === 0) {
    return <div className="text-gray-600">Loading lesson...</div>;
  }

  const handleCheckAnswer = () => {
    const currentEx = exercises[currentExercise];
    if (currentEx.type === 'multiple-choice') {
      const isCorrect = selectedAnswer === currentEx.correct;
      setShowResult(true);
      if (isCorrect) {
        toast.success('Correct! Well done! 🎉');
        setCompletedExercises([...completedExercises, currentExercise]);
      } else {
        toast.error('Not quite. Try again!');
      }
    }
  };

  const handleNextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      completeLesson(lesson.id)
        .then(() => toast.success('Lesson completed! Great job!'))
        .catch(() => toast.error('Failed to save lesson progress'));
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" asChild>
        <Link to="/student/courses">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Вернуться к курсам
        </Link>
      </Button>

      {/* Lesson Header */}
      <div>
        <Badge className="bg-blue-600 text-white border-0 mb-2">Lesson {lessonId}</Badge>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
        <p className="text-gray-600">{lesson.description}</p>
      </div>

      {/* Video Player */}
      <Card>
        <CardHeader>
          <CardTitle>Видео-урок</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video overflow-hidden rounded-lg bg-gray-900">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/Hp9wUEDasY4"
              title="Video lesson"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Задания к уроку</CardTitle>
            <Badge variant="outline">
              {currentExercise + 1} of {exercises.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {exercises[currentExercise].question}
              </h3>

              {exercises[currentExercise].type === 'multiple-choice' && (
                <div className="space-y-3">
                  {exercises[currentExercise].options?.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedAnswer(index)}
                      disabled={showResult}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        selectedAnswer === index
                          ? showResult
                            ? index === exercises[currentExercise].correct
                              ? 'border-green-500 bg-green-50'
                              : 'border-red-500 bg-red-50'
                            : 'border-blue-500 bg-blue-50'
                          : showResult && index === exercises[currentExercise].correct
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      } ${showResult ? 'cursor-not-allowed' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedAnswer === index
                              ? showResult
                                ? index === exercises[currentExercise].correct
                                  ? 'border-green-500 bg-green-500'
                                  : 'border-red-500 bg-red-500'
                                : 'border-blue-500 bg-blue-500'
                              : 'border-gray-300'
                          }`}
                        >
                          {showResult && index === exercises[currentExercise].correct && (
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span>{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  if (currentExercise > 0) {
                    setCurrentExercise(currentExercise - 1);
                    setSelectedAnswer(null);
                    setShowResult(false);
                  }
                }}
                disabled={currentExercise === 0}
              >
                Предыдущий
              </Button>

              {!showResult ? (
                <Button onClick={handleCheckAnswer} disabled={selectedAnswer === null}>
                  Следующий <ArrowRight/>
                </Button>
              ) : (
                <Button onClick={handleNextExercise}>
                  {currentExercise < exercises.length - 1 ? 'Next Exercise' : 'Complete Lesson'}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lesson Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Lesson Notes</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <h4>Key Points:</h4>
          <ul>
            <li>The past tense of "go" is "went"</li>
            <li>Use past simple for completed actions in the past</li>
            <li>Practice with regular and irregular verbs</li>
          </ul>
          <h4>Additional Resources:</h4>
          <ul>
            <li>Grammar reference guide (PDF)</li>
            <li>Practice exercises workbook</li>
            <li>Audio pronunciation examples</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
