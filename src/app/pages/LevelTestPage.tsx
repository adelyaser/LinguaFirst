import { useState } from 'react';
import { levelTestQuestions } from '../data/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { Link } from 'react-router';
import { CheckCircle2, XCircle, Trophy } from 'lucide-react';

export default function LevelTestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers, selectedAnswer];
      setAnswers(newAnswers);

      if (currentQuestion < levelTestQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResults(true);
      }
    }
  };

  const calculateLevel = () => {
    let correctCount = 0;
    answers.forEach((answer, index) => {
      if (answer === levelTestQuestions[index].correct) {
        correctCount++;
      }
    });

    const percentage = (correctCount / levelTestQuestions.length) * 100;

    if (percentage >= 90) return { level: 'C1', color: 'bg-red-500', desc: 'Advanced' };
    if (percentage >= 70) return { level: 'B2', color: 'bg-orange-500', desc: 'Upper Intermediate' };
    if (percentage >= 50) return { level: 'B1', color: 'bg-purple-500', desc: 'Intermediate' };
    if (percentage >= 30) return { level: 'A2', color: 'bg-blue-500', desc: 'Elementary' };
    return { level: 'A1', color: 'bg-green-500', desc: 'Beginner' };
  };

  const progress = ((currentQuestion + 1) / levelTestQuestions.length) * 100;

  if (showResults) {
    const result = calculateLevel();
    const correctCount = answers.filter((answer, index) => answer === levelTestQuestions[index].correct).length;

    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center">
            <CardHeader className="pb-0">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl mb-2">Test Complete!</CardTitle>
              <CardDescription className="text-lg">Here are your results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-8">
              <div>
                <div className="text-6xl font-bold text-gray-900 mb-2">{result.level}</div>
                <div className="text-xl text-gray-600 mb-4">{result.desc}</div>
                <Badge className={`${result.color} text-white border-0 text-lg px-6 py-2`}>
                  Your English Level
                </Badge>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 space-y-2">
                <div className="text-sm text-gray-600">Score</div>
                <div className="text-3xl font-bold text-gray-900">
                  {correctCount} / {levelTestQuestions.length}
                </div>
                <Progress value={(correctCount / levelTestQuestions.length) * 100} className="h-2" />
              </div>

              <div className="border-t border-gray-200 pt-6 space-y-4">
                <h3 className="font-semibold text-gray-900">Recommended Courses</h3>
                <p className="text-sm text-gray-600">
                  Based on your {result.level} level, we recommend starting with our {result.desc} course to build a strong foundation and progress to the next level.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button size="lg" className="flex-1" asChild>
                  <Link to="/courses">View Courses</Link>
                </Button>
                <Button size="lg" variant="outline" className="flex-1" asChild>
                  <Link to="/signup">Start Learning</Link>
                </Button>
              </div>

              <Button variant="ghost" onClick={() => {
                setCurrentQuestion(0);
                setAnswers([]);
                setShowResults(false);
                setSelectedAnswer(null);
              }}>
                Retake Test
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const question = levelTestQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">English Level Test</h1>
          <p className="text-lg opacity-90">
            Answer {levelTestQuestions.length} questions to discover your English level
          </p>
        </div>
      </section>

      {/* Test */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentQuestion + 1} of {levelTestQuestions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline">Question {currentQuestion + 1}</Badge>
                <Badge className="bg-blue-100 text-blue-700 border-0">{question.level}</Badge>
              </div>
              <CardTitle className="text-2xl">{question.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedAnswer === index
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === index
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswer === index && (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="text-lg">{option}</span>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          <div className="mt-8 flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                if (currentQuestion > 0) {
                  setCurrentQuestion(currentQuestion - 1);
                  setSelectedAnswer(answers[currentQuestion - 1] || null);
                  setAnswers(answers.slice(0, -1));
                }
              }}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              size="lg"
            >
              {currentQuestion === levelTestQuestions.length - 1 ? 'Finish Test' : 'Next Question'}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
