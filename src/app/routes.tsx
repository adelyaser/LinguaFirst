import { createBrowserRouter } from 'react-router';
import { PublicNav } from './components/PublicNav';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CoursesPage from './pages/CoursesPage';
import TeachersPage from './pages/TeachersPage';
import SuccessStoriesPage from './pages/SuccessStoriesPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import LevelTestPage from './pages/LevelTestPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PasswordRecoveryPage from './pages/PasswordRecoveryPage';
import PaymentPage from './pages/PaymentPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import StudentLayout from './layouts/StudentLayout';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentCoursesPage from './pages/student/StudentCoursesPage';
import StudentLessonPage from './pages/student/StudentLessonPage';
import StudentSchedulePage from './pages/student/StudentSchedulePage';
import VideoCallPage from './pages/student/VideoCallPage';
import StudentProfilePage from './pages/student/StudentProfilePage';
import TeacherLayout from './layouts/TeacherLayout';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import LessonLibraryPage from "./pages/teacher/LessonLibraryPage";
import TeacherSchedulePage from "./pages/teacher/TeacherSchedulePage";
import TeacherStudentsPage from "./pages/teacher/TeacherStudentsPage";
import LessonBuilderPage from "./pages/teacher/LessonBuilderPage";
import TeacherProfilePage from "./pages/teacher/TeacherProfilePage";

// Public Layout Wrapper
function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicNav />
      {children}
    </>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout><HomePage /></PublicLayout>,
  },
  {
    path: '/about',
    element: <PublicLayout><AboutPage /></PublicLayout>,
  },
  {
    path: '/courses',
    element: <PublicLayout><CoursesPage /></PublicLayout>,
  },
  {
    path: '/teachers',
    element: <PublicLayout><TeachersPage /></PublicLayout>,
  },
  {
    path: '/success-stories',
    element: <PublicLayout><SuccessStoriesPage /></PublicLayout>,
  },
  {
    path: '/pricing',
    element: <PublicLayout><PricingPage /></PublicLayout>,
  },
  {
    path: '/contact',
    element: <PublicLayout><ContactPage /></PublicLayout>,
  },
  {
    path: '/level-test',
    element: <PublicLayout><LevelTestPage /></PublicLayout>,
  },
  // Auth Pages
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/password-recovery',
    element: <PasswordRecoveryPage />,
  },
  // Payment Pages
  {
    path: '/payment',
    element: <PaymentPage />,
  },
  {
    path: '/payment/success',
    element: <PaymentSuccessPage />,
  },
  // Student Pages
  {
    path: '/student',
    element: <StudentLayout />,
    children: [
      {
        path: 'dashboard',
        element: <StudentDashboard />,
      },
      {
        path: 'courses',
        element: <StudentCoursesPage />,
      },
      {
        path: 'lesson/:lessonId',
        element: <StudentLessonPage />,
      },
      {
        path: 'schedule',
        element: <StudentSchedulePage />,
      },
      {
        path: 'profile',
        element: <StudentProfilePage />,
      },
    ],
  },
  {
    path: '/student/video-call/:callId',
    element: <VideoCallPage />,
  },
  // Teacher Pages
  {
    path: '/teacher',
    element: <TeacherLayout />,
    children: [
      {
        path: 'dashboard',
        element: <TeacherDashboard />,
      },
      {
        path: 'lessons',
        element: (
          <LessonBuilderPage/>
        ),
      },
      {
        path: 'schedule',
        element: (
          <TeacherSchedulePage />
        ),
      },
      {
        path: 'students',
        element: (
          <TeacherStudentsPage/>
        ),
      },
      {
        path: 'profile',
        element: (
          <TeacherProfilePage />
        ),
      },
    ],
  },
  // 404 Page
  {
    path: '*',
    element: (
      <PublicLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8">Page not found</p>
            <a href="/" className="text-blue-600 hover:text-blue-700 font-medium">
              Go back home
            </a>
          </div>
        </div>
      </PublicLayout>
    ),
  },
]);