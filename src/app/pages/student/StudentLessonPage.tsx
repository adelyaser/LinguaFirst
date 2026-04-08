import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { mockLessons } from '../../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { ArrowLeft, CheckCircle2, Play, Volume2 } from 'lucide-react';
import { toast } from 'sonner';

export default function StudentLessonPage() {
  const { lessonId } = useParams();
  const lesson = mockLessons.find((l) => l.id === lessonId) || mockLessons[0];

  const [videoProgress, setVideoProgress] = useState(0);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);

  // Mock exercises
  const exercises = [
    {
      type: 'multiple-choice',
      question: 'What is the past tense of "go"?',
      options: ['goed', 'went', 'gone', 'going'],
      correct: 1,
    },
    {
      type: 'fill-blank',
      question: 'I ___ to the store yesterday.',
      answer: 'went',
    },
    {
      type: 'multiple-choice',
      question: 'Which sentence is correct?',
      options: [
        'She go to school',
        'She goes to school',
        'She going to school',
        'She goed to school',
      ],
      correct: 1,
    },
  ];

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
      toast.success('Lesson completed! Great job! 🌟');
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" asChild>
        <Link to="/student/courses">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Courses
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
          <CardTitle>Video Lesson</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Mock Video Player */}
          <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-4">
            <Button
              size="lg"
              className="w-16 h-16 rounded-full"
              onClick={() => {
                toast.info('Video playing... (mock)');
                setVideoProgress(75);
              }}
            >
              <Play className="w-8 h-8" />
            </Button>
          </div>

          {/* Video Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Video Progress</span>
              <span className="font-medium">{videoProgress}%</span>
            </div>
            <Progress value={videoProgress} className="h-2" />
          </div>

          {/* Video Controls */}
          <div className="flex items-center gap-4 mt-4">
            <Button variant="outline" size="sm">
              <Volume2 className="w-4 h-4 mr-2" />
              Adjust Volume
            </Button>
            <Button variant="outline" size="sm">
              Subtitles: English
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Exercises */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Interactive Exercises</CardTitle>
            <Badge variant="outline">
              {currentExercise + 1} of {exercises.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Exercise Progress */}
            <Progress
              value={((currentExercise + 1) / exercises.length) * 100}
              className="h-2"
            />

            {/* Current Exercise */}
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

            {/* Action Buttons */}
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
                Previous
              </Button>

              {!showResult ? (
                <Button onClick={handleCheckAnswer} disabled={selectedAnswer === null}>
                  Check Answer
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
