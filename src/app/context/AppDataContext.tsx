import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getAuthToken, useAuth } from './AuthContext';

export interface Course {
  id: string;
  level: string;
  title: string;
  description: string;
  duration: string;
  lessons: number;
  price: number;
  color: string;
  skills: string[];
}

export interface LessonExercise {
  type: string;
  question: string;
  options?: string[];
  correct?: number;
  answer?: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  duration: number;
  videoUrl: string;
  exercises: LessonExercise[];
  completed: boolean;
  locked?: boolean;
}

export interface ScheduleLesson {
  id: string;
  title: string;
  teacher: string;
  teacherId: string;
  studentId: string | null;
  date: string;
  time: string;
  duration: number;
  type: string;
  status: string;
  link: string;
}

export interface StudentProgress {
  currentLevel: string;
  overallProgress: number;
  lessonsCompleted: number;
  totalLessons: number;
  studyStreak: number;
  hoursStudied: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  notIncluded: string[];
  popular: boolean;
}

export interface SuccessStory {
  id: string;
  name: string;
  country: string;
  achievement: string;
  story: string;
  before: string;
  after: string;
  duration: string;
  university?: string;
  destination?: string;
}

export interface LevelTestQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  level: string;
}

interface AppDataContextType {
  courses: Course[];
  lessons: Lesson[];
  schedules: ScheduleLesson[];
  progress: StudentProgress | null;
  pricingPlans: PricingPlan[];
  successStories: SuccessStory[];
  levelTestQuestions: LevelTestQuestion[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  completeLesson: (lessonId: string) => Promise<void>;
  createLesson: (payload: {
    title: string;
    courseId: string;
    description?: string;
    duration?: number;
    videoUrl?: string;
    exercises?: LessonExercise[];
  }) => Promise<void>;
  saveLevelTestResult: (level: string, score: number) => Promise<void>;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

function authHeaders() {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function getJson<T>(path: string, auth = false): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: auth ? authHeaders() : undefined,
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(payload?.error || `Failed to load ${path}`);
  }
  return payload;
}

export function AppDataProvider({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [schedules, setSchedules] = useState<ScheduleLesson[]>([]);
  const [progress, setProgress] = useState<StudentProgress | null>(null);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);
  const [levelTestQuestions, setLevelTestQuestions] = useState<LevelTestQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const publicData = await Promise.all([
        getJson<Course[]>('/courses'),
        getJson<PricingPlan[]>('/pricing-plans'),
        getJson<SuccessStory[]>('/success-stories'),
        getJson<LevelTestQuestion[]>('/level-test/questions'),
      ]);

      setCourses(publicData[0]);
      setPricingPlans(publicData[1]);
      setSuccessStories(publicData[2]);
      setLevelTestQuestions(publicData[3]);

      if (getAuthToken()) {
        const privateData = await Promise.allSettled([
          getJson<Lesson[]>('/lessons', true),
          getJson<ScheduleLesson[]>('/schedules', true),
          getJson<StudentProgress | null>('/student/progress', true),
        ]);

        if (privateData[0].status === 'fulfilled') setLessons(privateData[0].value);
        if (privateData[1].status === 'fulfilled') setSchedules(privateData[1].value);
        if (privateData[2].status === 'fulfilled') setProgress(privateData[2].value);
      } else {
        setLessons([]);
        setSchedules([]);
        setProgress(null);
      }
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading) {
      refresh();
    }
  }, [authLoading, refresh, user?.id, user?.role]);

  const value = useMemo<AppDataContextType>(() => ({
    courses,
    lessons,
    schedules,
    progress,
    pricingPlans,
    successStories,
    levelTestQuestions,
    loading,
    error,
    refresh,
    completeLesson: async (lessonId) => {
      const response = await fetch(`${API_URL}/lessons/${encodeURIComponent(lessonId)}/complete`, {
        method: 'POST',
        headers: authHeaders(),
      });
      if (!response.ok) throw new Error('Failed to complete lesson');
      await refresh();
    },
    createLesson: async (payload) => {
      const response = await fetch(`${API_URL}/lessons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Failed to create lesson');
      await refresh();
    },
    saveLevelTestResult: async (level, score) => {
      await fetch(`${API_URL}/level-test/results`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify({ level, score }),
      });
    },
  }), [courses, error, lessons, levelTestQuestions, loading, pricingPlans, progress, refresh, schedules, successStories]);

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
}
