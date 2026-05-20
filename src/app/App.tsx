import { RouterProvider } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import { AppDataProvider } from './context/AppDataContext';
import { LearningDbProvider } from './context/LearningDbContext';
import { router } from './routes';
import { Toaster } from './components/ui/sonner';
import { GlobalDomTranslator } from './i18n/GlobalDomTranslator';

export default function App() {
  return (
    <AuthProvider>
      <AppDataProvider>
        <LearningDbProvider>
          <RouterProvider router={router} />
          <GlobalDomTranslator />
          <Toaster />
        </LearningDbProvider>
      </AppDataProvider>
    </AuthProvider>
  );
}
