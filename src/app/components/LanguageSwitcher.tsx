import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { supportedLanguages, type SupportedLanguage } from '../i18n';

const languageLabels: Record<SupportedLanguage, string> = {
  ru: 'RU',
  en: 'EN',
  kk: 'KZ',
};

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const currentLanguage = supportedLanguages.includes(i18n.resolvedLanguage as SupportedLanguage)
    ? (i18n.resolvedLanguage as SupportedLanguage)
    : 'ru';

  const handleChange = (language: string) => {
    void i18n.changeLanguage(language);
  };

  return (
    <Select value={currentLanguage} onValueChange={handleChange}>
      <SelectTrigger
        size="sm"
        className="w-[96px] bg-white"
        aria-label={t('common.language')}
      >
        <Languages className="w-4 h-4" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        {supportedLanguages.map((language) => (
          <SelectItem key={language} value={language}>
            {languageLabels[language]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
