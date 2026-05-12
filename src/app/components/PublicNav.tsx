import { Link, useLocation } from 'react-router';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
import {ArrowRight, GraduationCap, Menu, X} from 'lucide-react';
import { useState } from 'react';

export function PublicNav() {
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Главное' },
    { to: '/about', label: 'О нас' },
    { to: '/courses', label: 'Программы' },
    { to: '/teachers', label: 'Учителя' },
    { to: '/success-stories', label: 'Кейсы' },
    { to: '/pricing', label: 'Тариф' },
    { to: '/contact', label: 'Контакты' },
  ];

  const dashboardLink =
    user?.role === 'admin'
      ? '/admin/assignments'
      : user?.role === 'teacher'
        ? '/teacher/dashboard'
        : '/student/dashboard';

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">LinguaFirst</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  location.pathname === link.to ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <Button asChild>
                <Link to={dashboardLink}>Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Войти</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">Начать <ArrowRight className="ml-2 w-5 h-5" /></Link>
                </Button>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    location.pathname === link.to ? 'text-blue-600' : 'text-gray-600'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
                {isAuthenticated ? (
                  <Button asChild onClick={() => setMobileMenuOpen(false)}>
                    <Link to={dashboardLink}>Dashboard</Link>
                  </Button>
                ) : (
                  <>
                    <Button variant="ghost" asChild onClick={() => setMobileMenuOpen(false)}>
                      <Link to="/login">Войти</Link>
                    </Button>
                    <Button asChild onClick={() => setMobileMenuOpen(false)}>
                      <Link to="/signup">Начать</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
