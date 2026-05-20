import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type Lang = 'ru' | 'en' | 'kk';

const phrases: Array<Record<Lang, string>> = [
  { ru: 'Мои студенты', en: 'My students', kk: 'Менің оқушыларым' },
  { ru: 'Список учеников, закрепленных администратором.', en: 'Students assigned by the administrator.', kk: 'Әкімші тағайындаған оқушылар тізімі.' },
  { ru: 'API сервер недоступен. Запустите `npm run server`.', en: 'API server is unavailable. Run `npm run server`.', kk: 'API сервер қолжетімсіз. `npm run server` іске қосыңыз.' },
  { ru: 'Загрузка данных из базы...', en: 'Loading data from database...', kk: 'Деректер базадан жүктелуде...' },
  { ru: 'Поиск по имени или email', en: 'Search by name or email', kk: 'Аты немесе email бойынша іздеу' },
  { ru: 'Все уровни', en: 'All levels', kk: 'Барлық деңгейлер' },
  { ru: 'Пока нет закрепленных учеников.', en: 'No assigned students yet.', kk: 'Әзірге тағайындалған оқушылар жоқ.' },
  { ru: 'Прогресс', en: 'Progress', kk: 'Прогресс' },
  { ru: 'Ученик', en: 'Student', kk: 'Оқушы' },
  { ru: 'Уровень', en: 'Level', kk: 'Деңгей' },
  { ru: 'Профиль', en: 'Profile', kk: 'Профиль' },
  { ru: 'Аккаунт', en: 'Account', kk: 'Аккаунт' },
  { ru: 'Оплата', en: 'Billing', kk: 'Төлем' },
  { ru: 'Безопасность', en: 'Security', kk: 'Қауіпсіздік' },
  { ru: 'ФИО', en: 'Full name', kk: 'Аты-жөні' },
  { ru: 'Номер телефона', en: 'Phone number', kk: 'Телефон нөмірі' },
  { ru: 'Сохранить изменения', en: 'Save changes', kk: 'Өзгерістерді сақтау' },
  { ru: 'Способ оплаты', en: 'Payment method', kk: 'Төлем әдісі' },
  { ru: 'Срок 12/28', en: 'Expires 12/28', kk: 'Мерзімі 12/28' },
  { ru: 'История', en: 'History', kk: 'Тарих' },
  { ru: 'Добавить карту', en: 'Add card', kk: 'Карта қосу' },
  { ru: 'Текущий пароль', en: 'Current password', kk: 'Қазіргі құпиясөз' },
  { ru: 'Новый пароль', en: 'New password', kk: 'Жаңа құпиясөз' },
  { ru: 'Повторите новый пароль', en: 'Confirm new password', kk: 'Жаңа құпиясөзді қайталаңыз' },
  { ru: 'Обновить пароль', en: 'Update password', kk: 'Құпиясөзді жаңарту' },
  { ru: 'Мое расписание', en: 'My schedule', kk: 'Менің кестем' },
  { ru: 'Апрель 2026', en: 'April 2026', kk: 'Сәуір 2026' },
  { ru: 'Ближайшие события', en: 'Upcoming events', kk: 'Жақын оқиғалар' },
  { ru: 'Синхронизируйте свои занятия с Google Календарем, чтобы никогда не пропустить урок', en: 'Sync lessons with Google Calendar so you never miss a class', kk: 'Сабақты өткізіп алмау үшін Google Calendar-пен синхрондаңыз' },
  { ru: 'Синхронизировать с Google Calendar', en: 'Sync with Google Calendar', kk: 'Google Calendar-пен синхрондау' },
  { ru: 'Конструктор урока', en: 'Lesson builder', kk: 'Сабақ құрастырушы' },
  { ru: 'Детали', en: 'Details', kk: 'Мәліметтер' },
  { ru: 'Заголовок', en: 'Title', kk: 'Тақырып' },
  { ru: 'Продолжительность', en: 'Duration', kk: 'Ұзақтығы' },
  { ru: 'Содержание', en: 'Content', kk: 'Мазмұн' },
  { ru: 'Добавить блок', en: 'Add block', kk: 'Блок қосу' },
  { ru: 'Выберите тип контента', en: 'Choose content type', kk: 'Контент түрін таңдаңыз' },
  { ru: 'Видео', en: 'Video', kk: 'Видео' },
  { ru: 'Текст', en: 'Text', kk: 'Мәтін' },
  { ru: 'Викторина', en: 'Quiz', kk: 'Квиз' },
  { ru: 'Изображение', en: 'Image', kk: 'Сурет' },
  { ru: 'Отмена', en: 'Cancel', kk: 'Болдырмау' },
  { ru: 'Сохранить', en: 'Save', kk: 'Сақтау' },
  { ru: 'Управление учениками', en: 'Student management', kk: 'Оқушыларды басқару' },
  { ru: 'Назначайте учеников преподавателям и меняйте ответственного учителя.', en: 'Assign students to teachers and change the responsible teacher.', kk: 'Оқушыларды мұғалімдерге тағайындап, жауапты мұғалімді өзгертіңіз.' },
  { ru: 'Ученики', en: 'Students', kk: 'Оқушылар' },
  { ru: 'Назначены', en: 'Assigned', kk: 'Тағайындалған' },
  { ru: 'Преподаватели', en: 'Teachers', kk: 'Мұғалімдер' },
  { ru: 'Закрепление учеников', en: 'Student assignments', kk: 'Оқушыларды бекіту' },
  { ru: 'Текущий учитель', en: 'Current teacher', kk: 'Қазіргі мұғалім' },
  { ru: 'Назначить', en: 'Assign', kk: 'Тағайындау' },
  { ru: 'Не назначен', en: 'Unassigned', kk: 'Тағайындалмаған' },
  { ru: 'Учителя', en: 'Teachers', kk: 'Мұғалімдер' },
  { ru: 'Всего учителей', en: 'Total teachers', kk: 'Барлық мұғалімдер' },
  { ru: 'Список учителей', en: 'Teacher list', kk: 'Мұғалімдер тізімі' },
  { ru: 'Имя', en: 'Name', kk: 'Аты' },
  { ru: 'Специальность', en: 'Specialty', kk: 'Мамандығы' },
  { ru: 'Действия', en: 'Actions', kk: 'Әрекеттер' },
  { ru: 'Удалить', en: 'Delete', kk: 'Жою' },
  { ru: 'Удалить учителя?', en: 'Delete teacher?', kk: 'Мұғалімді жою керек пе?' },
  { ru: 'Добро пожаловать снова!👋', en: 'Welcome back! 👋', kk: 'Қайта қош келдіңіз! 👋' },
  { ru: 'Давайте продолжим наше путешествие в изучении английского', en: 'Let us continue your English learning journey', kk: 'Ағылшын тілін үйренуді жалғастырайық' },
  { ru: 'Текущий уровень', en: 'Current level', kk: 'Қазіргі деңгей' },
  { ru: 'Огонек', en: 'Streak', kk: 'Серия' },
  { ru: 'Так держать!', en: 'Keep it up!', kk: 'Осылай жалғастырыңыз!' },
  { ru: 'Пройдено уроков', en: 'Lessons completed', kk: 'Өткен сабақтар' },
  { ru: 'Проведено часов', en: 'Hours studied', kk: 'Оқыған сағаттар' },
  { ru: 'Общий прогресс', en: 'Overall progress', kk: 'Жалпы прогресс' },
  { ru: 'Предстоящие занятия', en: 'Upcoming lessons', kk: 'Алдағы сабақтар' },
  { ru: 'Ваши занятия на этой неделе', en: 'Your lessons this week', kk: 'Осы аптадағы сабақтарыңыз' },
  { ru: 'Увидеть все', en: 'View all', kk: 'Барлығын көру' },
  { ru: 'Продолжите занятия', en: 'Continue lessons', kk: 'Сабақтарды жалғастыру' },
  { ru: 'Продолжите там, где остановились', en: 'Continue where you left off', kk: 'Тоқтаған жерден жалғастырыңыз' },
  { ru: 'Мои курсы', en: 'My courses', kk: 'Менің курстарым' },
  { ru: 'Уроки и отслеживание прогресса', en: 'Lessons and progress tracking', kk: 'Сабақтар және прогресті бақылау' },
  { ru: 'Вернуться к курсам', en: 'Back to courses', kk: 'Курстарға оралу' },
  { ru: 'Видео-урок', en: 'Video lesson', kk: 'Бейнесабақ' },
  { ru: 'Задания к уроку', en: 'Lesson exercises', kk: 'Сабақ тапсырмалары' },
  { ru: 'Предыдущий', en: 'Previous', kk: 'Алдыңғы' },
  { ru: 'Следующий', en: 'Next', kk: 'Келесі' },
  { ru: 'Leave Call', en: 'Leave call', kk: 'Қоңыраудан шығу' },
  { ru: 'Chat', en: 'Chat', kk: 'Чат' },
  { ru: 'Close', en: 'Close', kk: 'Жабу' },
  { ru: 'Send', en: 'Send', kk: 'Жіберу' },
];

const byVariant = new Map<string, Record<Lang, string>>();
phrases.forEach((phrase) => {
  byVariant.set(phrase.ru, phrase);
  byVariant.set(phrase.en, phrase);
  byVariant.set(phrase.kk, phrase);
});

function currentLang(language: string): Lang {
  if (language.startsWith('en')) return 'en';
  if (language.startsWith('kk')) return 'kk';
  return 'ru';
}

function translateText(value: string, lang: Lang) {
  const trimmed = value.trim();
  const phrase = byVariant.get(trimmed);
  if (!phrase) return value;
  return value.replace(trimmed, phrase[lang]);
}

export function GlobalDomTranslator() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = currentLang(i18n.resolvedLanguage || i18n.language || 'ru');

    const translateRoot = (root: ParentNode) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const nodes: Text[] = [];
      while (walker.nextNode()) nodes.push(walker.currentNode as Text);
      nodes.forEach((node) => {
        if (node.parentElement?.closest('script,style,textarea,input')) return;
        node.nodeValue = translateText(node.nodeValue || '', lang);
      });

      document.querySelectorAll<HTMLElement>('[placeholder]').forEach((element) => {
        const value = element.getAttribute('placeholder');
        if (value) element.setAttribute('placeholder', translateText(value, lang));
      });
    };

    translateRoot(document.body);
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) translateRoot(node as ParentNode);
          if (node.nodeType === Node.TEXT_NODE) node.nodeValue = translateText(node.nodeValue || '', lang);
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [i18n.language, i18n.resolvedLanguage]);

  return null;
}
