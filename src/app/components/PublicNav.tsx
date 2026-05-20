import { Link, useLocation } from 'react-router';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
import {ArrowRight, GraduationCap, Menu, X} from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';

export function PublicNav() {
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/courses', label: t('nav.courses') },
    { to: '/teachers', label: t('nav.teachers') },
    { to: '/success-stories', label: t('nav.successStories') },
    { to: '/pricing', label: t('nav.pricing') },
    { to: '/contact', label: t('nav.contact') },
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
            <LanguageSwitcher />
            {isAuthenticated ? (
              <Button asChild>
                <Link to={dashboardLink}>{t('common.dashboard')}</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">{t('nav.login')}</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">{t('nav.start')} <ArrowRight className="ml-2 w-5 h-5" /></Link>
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
                <LanguageSwitcher />
                {isAuthenticated ? (
                  <Button asChild onClick={() => setMobileMenuOpen(false)}>
                    <Link to={dashboardLink}>{t('common.dashboard')}</Link>
                  </Button>
                ) : (
                  <>
                    <Button variant="ghost" asChild onClick={() => setMobileMenuOpen(false)}>
                      <Link to="/login">{t('nav.login')}</Link>
                    </Button>
                    <Button asChild onClick={() => setMobileMenuOpen(false)}>
                      <Link to="/signup">{t('nav.start')}</Link>
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
