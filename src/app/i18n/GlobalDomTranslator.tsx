import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type Lang = 'ru' | 'en' | 'kk';

const phrases: Array<Record<Lang, string>> = [
  { ru: 'Мои студенты', en: 'My students', kk: 'Менің оқушыларым' },
  { ru: 'Список учеников, закрепленных администратором.', en: 'Students assigned by the administrator.', kk: 'Әкімші тағайындаған оқушылар тізімі.' },
  { ru: 'API сервер недоступен. Запустите `npm run server`.', en: 'API server is unavailable. Run `npm run server`.', kk: 'API сервер қолжетімсіз. `npm run server` іске қосыңыз.' },
  { ru: 'Загрузка данных из базы...', en: 'Loading data from database...', kk: 'Деректер базадан жүктелуде...' },
  { ru: 'Загрузка курсов...', en: 'Loading courses...', kk: 'Курстар жүктелуде...' },
  { ru: 'Загрузка урока...', en: 'Loading lesson...', kk: 'Сабақ жүктелуде...' },
  { ru: 'Поиск по имени или email', en: 'Search by name or email', kk: 'Аты немесе email бойынша іздеу' },
  { ru: 'Все уровни', en: 'All levels', kk: 'Барлық деңгейлер' },
  { ru: 'Пока нет закрепленных учеников.', en: 'No assigned students yet.', kk: 'Әзірге тағайындалған оқушылар жоқ.' },
  { ru: 'Прогресс', en: 'Progress', kk: 'Прогресс' },
  { ru: 'Ученик', en: 'Student', kk: 'Оқушы' },
  { ru: 'Студент', en: 'Student', kk: 'Студент' },
  { ru: 'Учитель', en: 'Teacher', kk: 'Мұғалім' },
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
  { ru: 'Оплачено', en: 'Paid', kk: 'Төленді' },
  { ru: 'Апрель 7, 2026', en: 'April 7, 2026', kk: '2026 жылғы 7 сәуір' },
  { ru: 'Март 7, 2026', en: 'March 7, 2026', kk: '2026 жылғы 7 наурыз' },
  { ru: 'Февраль 7, 2026', en: 'February 7, 2026', kk: '2026 жылғы 7 ақпан' },
  { ru: 'Добавить карту', en: 'Add card', kk: 'Карта қосу' },
  { ru: 'Текущий пароль', en: 'Current password', kk: 'Қазіргі құпиясөз' },
  { ru: 'Новый пароль', en: 'New password', kk: 'Жаңа құпиясөз' },
  { ru: 'Повторите новый пароль', en: 'Confirm new password', kk: 'Жаңа құпиясөзді қайталаңыз' },
  { ru: 'Обновить пароль', en: 'Update password', kk: 'Құпиясөзді жаңарту' },
  { ru: 'Профиль успешно обновлен!', en: 'Profile updated successfully!', kk: 'Профиль сәтті жаңартылды!' },
  { ru: 'Пароль успешно обновлен!', en: 'Password updated successfully!', kk: 'Құпиясөз сәтті жаңартылды!' },
  { ru: 'Мое расписание', en: 'My schedule', kk: 'Менің кестем' },
  { ru: 'Апрель 2026', en: 'April 2026', kk: 'Сәуір 2026' },
  { ru: 'Ближайшие события', en: 'Upcoming events', kk: 'Жақын оқиғалар' },
  { ru: 'Синхронизируйте свои занятия с Google Календарем, чтобы никогда не пропустить урок', en: 'Sync lessons with Google Calendar so you never miss a class', kk: 'Сабақты өткізіп алмау үшін Google Calendar-пен синхрондаңыз' },
  { ru: 'Синхронизировать с Google Calendar', en: 'Sync with Google Calendar', kk: 'Google Calendar-пен синхрондау' },
  { ru: 'Конструктор урока', en: 'Lesson builder', kk: 'Сабақ құрастырушы' },
  { ru: 'Детали', en: 'Details', kk: 'Мәліметтер' },
  { ru: 'Заголовок', en: 'Title', kk: 'Тақырып' },
  { ru: 'Продолжительность', en: 'Duration', kk: 'Ұзақтығы' },
  { ru: '30 минут', en: '30 minutes', kk: '30 минут' },
  { ru: '45 минут', en: '45 minutes', kk: '45 минут' },
  { ru: '60 минут', en: '60 minutes', kk: '60 минут' },
  { ru: '90 минут', en: '90 minutes', kk: '90 минут' },
  { ru: 'Содержание', en: 'Content', kk: 'Мазмұн' },
  { ru: 'Пока нет блоков с заданиями', en: 'No task blocks yet', kk: 'Әзірге тапсырма блоктары жоқ' },
  { ru: 'Добавить блок', en: 'Add block', kk: 'Блок қосу' },
  { ru: 'Выберите тип контента', en: 'Choose content type', kk: 'Контент түрін таңдаңыз' },
  { ru: 'Видео', en: 'Video', kk: 'Видео' },
  { ru: 'видео', en: 'video', kk: 'видео' },
  { ru: 'Текст', en: 'Text', kk: 'Мәтін' },
  { ru: 'текст', en: 'text', kk: 'мәтін' },
  { ru: 'Викторина', en: 'Quiz', kk: 'Квиз' },
  { ru: 'квиз', en: 'quiz', kk: 'квиз' },
  { ru: 'Изображение', en: 'Image', kk: 'Сурет' },
  { ru: 'изображение', en: 'image', kk: 'сурет' },
  { ru: 'Картинка', en: 'Image', kk: 'Сурет' },
  { ru: 'Контент', en: 'Content', kk: 'Контент' },
  { ru: 'Добавить видео урок', en: 'Add a video lesson', kk: 'Бейнесабақ қосу' },
  { ru: 'Добавить текст', en: 'Add text', kk: 'Мәтін қосу' },
  { ru: 'Добавить вопросы и ответы', en: 'Add questions and answers', kk: 'Сұрақтар мен жауаптар қосу' },
  { ru: 'Добавить изображение', en: 'Add an image', kk: 'Сурет қосу' },
  { ru: 'Введите заголовок', en: 'Enter a title', kk: 'Тақырып енгізіңіз' },
  { ru: 'Введите содержание', en: 'Enter content', kk: 'Мазмұн енгізіңіз' },
  { ru: 'Вопрос', en: 'Question', kk: 'Сұрақ' },
  { ru: 'Введите вопрос', en: 'Enter a question', kk: 'Сұрақ енгізіңіз' },
  { ru: 'Ответ', en: 'Answer', kk: 'Жауап' },
  { ru: 'Правильный', en: 'Correct', kk: 'Дұрыс' },
  { ru: 'Выбрать как правильный', en: 'Mark as correct', kk: 'Дұрыс деп белгілеу' },
  { ru: 'блок', en: 'Block', kk: 'блогы' },
  { ru: 'Добавьте заголовок урока', en: 'Please add a lesson title', kk: 'Сабақ тақырыбын қосыңыз' },
  { ru: 'Добавьте хотя бы один блок контента', en: 'Please add at least one content block', kk: 'Кемінде бір контент блогын қосыңыз' },
  { ru: 'Урок успешно сохранен!', en: 'Lesson saved successfully!', kk: 'Сабақ сәтті сақталды!' },
  { ru: 'Не удалось сохранить урок', en: 'Failed to save lesson', kk: 'Сабақты сақтау мүмкін болмады' },
  { ru: 'Урок сохранен как шаблон!', en: 'Lesson saved as template!', kk: 'Сабақ үлгі ретінде сақталды!' },
  { ru: 'Отмена', en: 'Cancel', kk: 'Болдырмау' },
  { ru: 'Сохранить', en: 'Save', kk: 'Сақтау' },
  { ru: 'Управление учениками', en: 'Student management', kk: 'Оқушыларды басқару' },
  { ru: 'Назначайте учеников преподавателям и меняйте ответственного учителя.', en: 'Assign students to teachers and change the responsible teacher.', kk: 'Оқушыларды мұғалімдерге тағайындап, жауапты мұғалімді өзгертіңіз.' },
  { ru: 'Назначение обновлено', en: 'Assignment updated', kk: 'Тағайындау жаңартылды' },
  { ru: 'Не удалось сохранить назначение', en: 'Could not save assignment', kk: 'Тағайындауды сақтау мүмкін болмады' },
  { ru: 'всего в базе', en: 'total in database', kk: 'дерекқордағы жалпы саны' },
  { ru: 'есть закрепленный учитель', en: 'have an assigned teacher', kk: 'тағайындалған мұғалімі бар' },
  { ru: 'доступны для назначения', en: 'available for assignment', kk: 'тағайындауға қолжетімді' },
  { ru: 'Ученики', en: 'Students', kk: 'Оқушылар' },
  { ru: 'Назначены', en: 'Assigned', kk: 'Тағайындалған' },
  { ru: 'Преподаватели', en: 'Teachers', kk: 'Мұғалімдер' },
  { ru: 'Закрепление учеников', en: 'Student assignments', kk: 'Оқушыларды бекіту' },
  { ru: 'Текущий учитель', en: 'Current teacher', kk: 'Қазіргі мұғалім' },
  { ru: 'Назначить', en: 'Assign', kk: 'Тағайындау' },
  { ru: 'Не назначен', en: 'Unassigned', kk: 'Тағайындалмаған' },
  { ru: 'Учителя', en: 'Teachers', kk: 'Мұғалімдер' },
  { ru: 'Просматривайте список преподавателей и удаляйте ненужные аккаунты.', en: 'Review the teacher list and delete accounts you no longer need.', kk: 'Мұғалімдер тізімін қарап, қажет емес аккаунттарды жойыңыз.' },
  { ru: 'Всего учителей', en: 'Total teachers', kk: 'Барлық мұғалімдер' },
  { ru: 'активные аккаунты в базе', en: 'active accounts in database', kk: 'дерекқордағы белсенді аккаунттар' },
  { ru: 'Список учителей', en: 'Teacher list', kk: 'Мұғалімдер тізімі' },
  { ru: 'Удаление также отвязывает учеников от выбранного преподавателя.', en: 'Deleting also unassigns students from the selected teacher.', kk: 'Жою таңдалған мұғалімнен оқушыларды да ажыратады.' },
  { ru: 'Имя', en: 'Name', kk: 'Аты' },
  { ru: 'Специальность', en: 'Specialty', kk: 'Мамандығы' },
  { ru: 'Действия', en: 'Actions', kk: 'Әрекеттер' },
  { ru: 'Удалить', en: 'Delete', kk: 'Жою' },
  { ru: 'Учителей пока нет.', en: 'There are no teachers yet.', kk: 'Әзірге мұғалімдер жоқ.' },
  { ru: 'Удалить учителя?', en: 'Delete teacher?', kk: 'Мұғалімді жою керек пе?' },
  { ru: 'Учитель удален', en: 'Teacher deleted', kk: 'Мұғалім жойылды' },
  { ru: 'Не удалось удалить учителя', en: 'Could not delete teacher', kk: 'Мұғалімді жою мүмкін болмады' },
  { ru: 'Учитель', en: 'Teacher', kk: 'Мұғалім' },
  { ru: 'будет удален. Его ученики останутся в базе без назначенного преподавателя.', en: 'will be deleted. Their students will remain in the database without an assigned teacher.', kk: 'жойылады. Оның оқушылары дерекқорда тағайындалған мұғалімсіз қалады.' },
  { ru: 'Удаление...', en: 'Deleting...', kk: 'Жойылуда...' },
  { ru: 'Добро пожаловать снова!👋', en: 'Welcome back! 👋', kk: 'Қайта қош келдіңіз! 👋' },
  { ru: 'Давайте продолжим наше путешествие в изучении английского', en: 'Let us continue your English learning journey', kk: 'Ағылшын тілін үйренуді жалғастырайық' },
  { ru: 'Текущий уровень', en: 'Current level', kk: 'Қазіргі деңгей' },
  { ru: 'Огонек', en: 'Streak', kk: 'Серия' },
  { ru: 'Так держать!', en: 'Keep it up!', kk: 'Осылай жалғастырыңыз!' },
  { ru: 'Пройдено уроков', en: 'Lessons completed', kk: 'Өткен сабақтар' },
  { ru: 'уроков выполнено', en: 'lessons completed', kk: 'сабақ аяқталды' },
  { ru: 'уроков', en: 'lessons', kk: 'сабақ' },
  { ru: 'урока', en: 'lessons', kk: 'сабақ' },
  { ru: 'из', en: 'of', kk: 'ішінен' },
  { ru: 'дней', en: 'days', kk: 'күн' },
  { ru: 'Проведено часов', en: 'Hours studied', kk: 'Оқыған сағаттар' },
  { ru: 'Общий прогресс', en: 'Overall progress', kk: 'Жалпы прогресс' },
  { ru: 'Предстоящие занятия', en: 'Upcoming lessons', kk: 'Алдағы сабақтар' },
  { ru: 'Ваши занятия на этой неделе', en: 'Your lessons this week', kk: 'Осы аптадағы сабақтарыңыз' },
  { ru: 'Увидеть все', en: 'View all', kk: 'Барлығын көру' },
  { ru: 'Продолжите занятия', en: 'Continue lessons', kk: 'Сабақтарды жалғастыру' },
  { ru: 'Продолжите там, где остановились', en: 'Continue where you left off', kk: 'Тоқтаған жерден жалғастырыңыз' },
  { ru: 'Мои курсы', en: 'My courses', kk: 'Менің курстарым' },
  { ru: 'Уроки и отслеживание прогресса', en: 'Lessons and progress tracking', kk: 'Сабақтар және прогресті бақылау' },
  { ru: 'Завершенных курсов пока нет', en: 'No completed courses yet', kk: 'Әзірге аяқталған курстар жоқ' },
  { ru: 'Продолжайте учиться, чтобы завершить первый курс!', en: 'Keep learning to complete your first course!', kk: 'Алғашқы курсты аяқтау үшін оқуды жалғастырыңыз!' },
  { ru: 'Записаться сейчас', en: 'Enroll now', kk: 'Қазір жазылу' },
  { ru: 'Вернуться к курсам', en: 'Back to courses', kk: 'Курстарға оралу' },
  { ru: 'Урок', en: 'Lesson', kk: 'Сабақ' },
  { ru: 'Видео-урок', en: 'Video lesson', kk: 'Бейнесабақ' },
  { ru: 'Видео воспроизводится... (макет)', en: 'Video playing... (mock)', kk: 'Видео ойнатылуда... (макет)' },
  { ru: 'Задания к уроку', en: 'Lesson exercises', kk: 'Сабақ тапсырмалары' },
  { ru: 'из', en: 'of', kk: '/' },
  { ru: 'Правильно! Отличная работа! 🎉', en: 'Correct! Well done! 🎉', kk: 'Дұрыс! Жарайсыз! 🎉' },
  { ru: 'Не совсем. Попробуйте снова!', en: 'Not quite. Try again!', kk: 'Дәл емес. Қайталап көріңіз!' },
  { ru: 'Урок завершен! Отличная работа!', en: 'Lesson completed! Great job!', kk: 'Сабақ аяқталды! Жарайсыз!' },
  { ru: 'Не удалось сохранить прогресс урока', en: 'Failed to save lesson progress', kk: 'Сабақ прогресін сақтау мүмкін болмады' },
  { ru: 'Следующее задание', en: 'Next exercise', kk: 'Келесі тапсырма' },
  { ru: 'Завершить урок', en: 'Complete lesson', kk: 'Сабақты аяқтау' },
  { ru: 'Заметки к уроку', en: 'Lesson notes', kk: 'Сабақ жазбалары' },
  { ru: 'Ключевые моменты:', en: 'Key points:', kk: 'Негізгі тұстар:' },
  { ru: 'Дополнительные ресурсы:', en: 'Additional resources:', kk: 'Қосымша ресурстар:' },
  { ru: 'Прошедшая форма "go" - "went"', en: 'The past tense of "go" is "went"', kk: '"go" етістігінің өткен шағы - "went"' },
  { ru: 'Используйте Past Simple для завершенных действий в прошлом', en: 'Use past simple for completed actions in the past', kk: 'Өткенде аяқталған әрекеттер үшін Past Simple қолданыңыз' },
  { ru: 'Практикуйтесь с правильными и неправильными глаголами', en: 'Practice with regular and irregular verbs', kk: 'Дұрыс және бұрыс етістіктермен жаттығыңыз' },
  { ru: 'Справочник по грамматике (PDF)', en: 'Grammar reference guide (PDF)', kk: 'Грамматика анықтамалығы (PDF)' },
  { ru: 'Рабочая тетрадь с упражнениями', en: 'Practice exercises workbook', kk: 'Жаттығулар жұмыс дәптері' },
  { ru: 'Аудиопримеры произношения', en: 'Audio pronunciation examples', kk: 'Айтылым аудио мысалдары' },
  { ru: 'Предыдущий', en: 'Previous', kk: 'Алдыңғы' },
  { ru: 'Следующий', en: 'Next', kk: 'Келесі' },
  { ru: 'Кабинет учителя', en: 'Teacher dashboard', kk: 'Мұғалім кабинеті' },
  { ru: 'Ваши ученики, уроки и ближайшее расписание из базы данных.', en: 'Your students, lessons and upcoming schedule from the database.', kk: 'Дерекқордағы оқушыларыңыз, сабақтарыңыз және алдағы кесте.' },
  { ru: 'Ученики', en: 'Students', kk: 'Оқушылар' },
  { ru: 'назначены администратором', en: 'assigned by admin', kk: 'әкімші тағайындаған' },
  { ru: 'Завершенные уроки', en: 'Completed lessons', kk: 'Аяқталған сабақтар' },
  { ru: 'сохранено в PostgreSQL', en: 'saved in PostgreSQL', kk: 'PostgreSQL-де сақталған' },
  { ru: 'Запланированные часы', en: 'Scheduled hours', kk: 'Жоспарланған сағаттар' },
  { ru: 'предстоящая нагрузка', en: 'upcoming workload', kk: 'алдағы жүктеме' },
  { ru: 'Предстоящие занятия', en: 'Upcoming lessons', kk: 'Алдағы сабақтар' },
  { ru: 'Уроки загружены из backend API.', en: 'Lessons loaded from the backend API.', kk: 'Сабақтар backend API-ден жүктелді.' },
  { ru: 'Увидеть все', en: 'View all', kk: 'Барлығын көру' },
  { ru: 'с', en: 'with', kk: 'мұғалім:' },
  { ru: 'individual', en: 'individual', kk: 'жеке' },
  { ru: 'group', en: 'group', kk: 'топтық' },
  { ru: 'Вс', en: 'Sun', kk: 'Жек' },
  { ru: 'Пн', en: 'Mon', kk: 'Дүй' },
  { ru: 'Вт', en: 'Tue', kk: 'Сей' },
  { ru: 'Ср', en: 'Wed', kk: 'Сәр' },
  { ru: 'Чт', en: 'Thu', kk: 'Бей' },
  { ru: 'Пт', en: 'Fri', kk: 'Жұм' },
  { ru: 'Сб', en: 'Sat', kk: 'Сен' },
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
  const exactPhrase = byVariant.get(trimmed);
  if (exactPhrase) return value.replace(trimmed, exactPhrase[lang]);

  let translated = value;
  const variants = Array.from(byVariant.keys())
    .filter((variant) => variant.length >= 4)
    .sort((a, b) => b.length - a.length);
  variants.forEach((variant) => {
    const phrase = byVariant.get(variant);
    if (!phrase || !translated.includes(variant)) return;
    translated = translated.split(variant).join(phrase[lang]);
  });
  return translated;
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
