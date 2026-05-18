import { RouterProvider } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import { AppDataProvider } from './context/AppDataContext';
import { LearningDbProvider } from './context/LearningDbContext';
import { router } from './routes';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <AuthProvider>
      <AppDataProvider>
        <LearningDbProvider>
          <RouterProvider router={router} />
          <Toaster />
        </LearningDbProvider>
      </AppDataProvider>
    </AuthProvider>
  );
}
