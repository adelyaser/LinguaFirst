import { RouterProvider } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import { LearningDbProvider } from './context/LearningDbContext';
import { router } from './routes';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <AuthProvider>
      <LearningDbProvider>
        <RouterProvider router={router} />
        <Toaster />
      </LearningDbProvider>
    </AuthProvider>
  );
}
