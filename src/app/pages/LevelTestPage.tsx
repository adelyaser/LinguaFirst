import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, CheckCircle2, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppData } from '../context/AppDataContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';

export default function LevelTestPage() {
  const { levelTestQuestions, saveLevelTestResult } = useAppData();
  const { t } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const calculateLevel = () => {
    const correctCount = answers.filter((answer, index) => answer === levelTestQuestions[index].correct).length;
    const percentage = (correctCount / levelTestQuestions.length) * 100;
    if (percentage >= 90) return { level: 'C1', color: 'bg-red-500', desc: 'Advanced' };
    if (percentage >= 70) return { level: 'B2', color: 'bg-orange-500', desc: 'Upper Intermediate' };
    if (percentage >= 50) return { level: 'B1', color: 'bg-purple-500', desc: 'Intermediate' };
    if (percentage >= 30) return { level: 'A2', color: 'bg-blue-500', desc: 'Elementary' };
    return { level: 'A1', color: 'bg-green-500', desc: 'Beginner' };
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    if (currentQuestion < levelTestQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      return;
    }
    const correctCount = newAnswers.filter((answer, index) => answer === levelTestQuestions[index].correct).length;
    const score = Math.round((correctCount / levelTestQuestions.length) * 100);
    const level = score >= 90 ? 'C1' : score >= 70 ? 'B2' : score >= 50 ? 'B1' : score >= 30 ? 'A2' : 'A1';
    saveLevelTestResult(level, score).catch(() => {});
    setShowResults(true);
  };

  if (levelTestQuestions.length === 0) {
    return <div className="min-h-screen bg-gray-50 py-16 text-center text-gray-600">{t('common.loading')}</div>;
  }

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
              <CardTitle className="text-3xl mb-2">{t('levelTestPage.finished')}</CardTitle>
              <CardDescription className="text-lg">{t('levelTestPage.result')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-8">
              <div>
                <div className="text-6xl font-bold text-gray-900 mb-2">{result.level}</div>
                <div className="text-xl text-gray-600 mb-4">{result.desc}</div>
                <Badge className={`${result.color} text-white border-0 text-lg px-6 py-2`}>{t('levelTestPage.yourLevel')}</Badge>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 space-y-2">
                <div className="text-sm text-gray-600">{t('levelTestPage.score')}</div>
                <div className="text-3xl font-bold text-gray-900">{correctCount} / {levelTestQuestions.length}</div>
                <Progress value={(correctCount / levelTestQuestions.length) * 100} className="h-2" />
              </div>
              <div className="border-t border-gray-200 pt-6 space-y-4">
                <h3 className="font-semibold text-gray-900">{t('levelTestPage.recommended')}</h3>
                <p className="text-sm text-gray-600">{t('levelTestPage.recommendation', { level: result.level, desc: result.desc })}</p>
              </div>
              <Button size="lg" className="w-full" asChild>
                <Link to="/courses">{t('levelTestPage.programs')} <ArrowRight /></Link>
              </Button>
              <Button variant="ghost" onClick={() => { setCurrentQuestion(0); setAnswers([]); setShowResults(false); setSelectedAnswer(null); }}>
                {t('levelTestPage.retry')}
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
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">{t('levelTestPage.title')}</h1>
          <p className="text-lg opacity-90">{t('levelTestPage.description', { count: levelTestQuestions.length })}</p>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{t('levelTestPage.questionOf', { current: currentQuestion + 1, total: levelTestQuestions.length })}</span>
              <span>{Math.round(progress)}% {t('levelTestPage.complete')}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline">{t('common.lesson')} {currentQuestion + 1}</Badge>
                <Badge className="bg-blue-100 text-blue-700 border-0">{question.level}</Badge>
              </div>
              <CardTitle className="text-2xl">{question.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {question.options.map((option, index) => (
                <button key={option} onClick={() => setSelectedAnswer(index)} className={`w-full text-left p-4 rounded-lg border-2 transition-all ${selectedAnswer === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedAnswer === index ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}>
                      {selectedAnswer === index && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </div>
                    <span className="text-lg">{option}</span>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={() => { if (currentQuestion > 0) { setCurrentQuestion(currentQuestion - 1); setSelectedAnswer(answers[currentQuestion - 1] || null); setAnswers(answers.slice(0, -1)); } }} disabled={currentQuestion === 0}>
              {t('common.previous')}
            </Button>
            <Button onClick={handleNext} disabled={selectedAnswer === null} size="lg">
              {currentQuestion === levelTestQuestions.length - 1 ? t('levelTestPage.finish') : t('common.next')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
