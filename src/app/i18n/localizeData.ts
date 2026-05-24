import type { TFunction } from 'i18next';
import type { Course, Lesson, PricingPlan, ScheduleLesson, SuccessStory } from '../context/AppDataContext';

const courseText = {
  a1: {
    title: ['Beginner. From zero', 'Beginner', 'Бастапқы. Нөлден'],
    description: ['Начните изучать английский с нуля.', 'Start learning English from zero.', 'Ағылшын тілін нөлден бастаңыз.'],
    duration: ['3 месяца', '3 months', '3 ай'],
    skills: [
      ['Базовый словарный запас', 'Простая грамматика', 'Повседневные фразы'],
      ['Basic vocabulary', 'Simple grammar', 'Everyday phrases'],
      ['Негізгі сөздік қор', 'Қарапайым грамматика', 'Күнделікті тіркестер'],
    ],
  },
  a2: {
    title: ['Elementary. Начинающие', 'Elementary', 'Elementary. Бастаушылар'],
    description: ['Укрепите базовые знания и обретите уверенность.', 'Build confidence with everyday English.', 'Күнделікті ағылшынға сенімділік қалыптастырыңыз.'],
    duration: ['3 месяца', '3 months', '3 ай'],
    skills: [
      ['Более широкий словарный запас', 'Прошедшие времена', 'Распространенные выражения'],
      ['Wider vocabulary', 'Past tenses', 'Common expressions'],
      ['Кеңірек сөздік қор', 'Өткен шақтар', 'Жиі қолданылатын тіркестер'],
    ],
  },
  b1: {
    title: ['Intermediate. Средний уровень', 'Intermediate', 'Intermediate. Орта деңгей'],
    description: ['Учитесь свободнее выражать мысли в разных ситуациях.', 'Speak more freely in practical situations.', 'Әртүрлі жағдайда еркінірек сөйлеуді үйреніңіз.'],
    duration: ['4 месяца', '4 months', '4 ай'],
    skills: [
      ['Сложные предложения', 'Идиомы', 'Деловое общение'],
      ['Complex sentences', 'Idioms', 'Work communication'],
      ['Күрделі сөйлемдер', 'Идиомалар', 'Іскерлік қарым-қатынас'],
    ],
  },
  b2: {
    title: ['Upper Intermediate. Средне-продвинутый', 'Upper Intermediate', 'Upper Intermediate. Жоғары орта'],
    description: ['Освойте продвинутую грамматику и точную лексику.', 'Use advanced structures and precise vocabulary.', 'Күрделі құрылымдар мен нақты сөздікті меңгеріңіз.'],
    duration: ['4 месяца', '4 months', '4 ай'],
    skills: [
      ['Продвинутая грамматика', 'Свободные обсуждения', 'Академическое письмо'],
      ['Advanced grammar', 'Fluent discussions', 'Academic writing'],
      ['Жоғары грамматика', 'Еркін талқылау', 'Академиялық жазу'],
    ],
  },
  c1: {
    title: ['Advanced. Продвинутый уровень', 'Advanced', 'Advanced. Жоғары деңгей'],
    description: ['Достигните уверенного владения языком.', 'Reach confident, near-native communication.', 'Тілді сенімді қолдану деңгейіне жетіңіз.'],
    duration: ['5 месяцев', '5 months', '5 ай'],
    skills: [
      ['Свободное владение языком', 'Тонкости общения', 'Письмо уровня экзамена'],
      ['Natural fluency', 'Nuanced communication', 'Exam-level writing'],
      ['Еркін сөйлеу', 'Қарым-қатынас нәзіктіктері', 'Емтихан деңгейіндегі жазу'],
    ],
  },
} as const;

const pricingText = {
  basic: {
    name: ['Базовый', 'Basic', 'Базалық'],
    period: ['месяц', 'month', 'ай'],
    description: ['Хороший старт для новичков.', 'Good start for beginners.', 'Жаңадан бастаушыларға жақсы бастама.'],
    features: [
      ['4 групповых занятия в месяц', 'Учебные материалы', 'Форум сообщества', 'Отслеживание прогресса'],
      ['4 group lessons per month', 'Learning materials', 'Community forum', 'Progress tracking'],
      ['Айына 4 топтық сабақ', 'Оқу материалдары', 'Қауымдастық форумы', 'Прогресті бақылау'],
    ],
    notIncluded: [
      ['Индивидуальные занятия', 'Проверка домашних заданий', 'Сертификат'],
      ['Individual lessons', 'Homework review', 'Certificate'],
      ['Жеке сабақтар', 'Үй тапсырмасын тексеру', 'Сертификат'],
    ],
  },
  standard: {
    name: ['Стандартный', 'Standard', 'Стандарт'],
    period: ['месяц', 'month', 'ай'],
    description: ['Популярный план для стабильного обучения.', 'Most popular plan for steady learning.', 'Тұрақты оқуға арналған танымал жоспар.'],
    features: [
      ['8 групповых занятий в месяц', '2 индивидуальных занятия в месяц', 'Все материалы', 'Проверка домашних заданий', 'Ежемесячное тестирование'],
      ['8 group lessons per month', '2 individual lessons per month', 'All materials', 'Homework review', 'Monthly testing'],
      ['Айына 8 топтық сабақ', 'Айына 2 жеке сабақ', 'Барлық материалдар', 'Үй тапсырмасын тексеру', 'Ай сайынғы тест'],
    ],
    notIncluded: [['Сертификат'], ['Certificate'], ['Сертификат']],
  },
  premium: {
    name: ['Премиум', 'Premium', 'Премиум'],
    period: ['месяц', 'month', 'ай'],
    description: ['Максимальная гибкость и личная поддержка.', 'Maximum flexibility and personal support.', 'Максималды икемділік және жеке қолдау.'],
    features: [
      ['Безлимитные групповые занятия', '8 индивидуальных занятий в месяц', 'Приоритетная поддержка', 'Проверка домашних заданий', 'Сертификат'],
      ['Unlimited group lessons', '8 individual lessons per month', 'Priority support', 'Homework review', 'Certificate'],
      ['Шексіз топтық сабақтар', 'Айына 8 жеке сабақ', 'Басым қолдау', 'Үй тапсырмасын тексеру', 'Сертификат'],
    ],
    notIncluded: [[], [], []],
  },
} as const;

const storyText = {
  'story-1': {
    country: ['Астана', 'Astana', 'Астана'],
    achievement: ['IELTS 8.0', 'IELTS 8.0', 'IELTS 8.0'],
    story: ['От B1 до C1 за шесть месяцев, теперь учится за рубежом.', 'From B1 to C1 in six months, now studying abroad.', 'Алты айда B1-ден C1-ге жетіп, қазір шетелде оқиды.'],
    duration: ['6 месяцев', '6 months', '6 ай'],
  },
  'story-2': {
    country: ['Актау', 'Aktau', 'Ақтау'],
    achievement: ['IELTS 7.5', 'IELTS 7.5', 'IELTS 7.5'],
    story: ['Улучшил speaking с 5.5 до 7.5 и получил новую должность.', 'Improved speaking from 5.5 to 7.5 and got a new role.', 'Speaking бағасын 5.5-тен 7.5-ке көтеріп, жаңа қызмет алды.'],
    duration: ['4 месяца', '4 months', '4 ай'],
  },
  'story-3': {
    country: ['Алматы', 'Almaty', 'Алматы'],
    achievement: ['Бизнес-английский', 'Business English', 'Бизнес ағылшын'],
    story: ['Получила повышение после курса бизнес-английского B2.', 'Promoted after completing the B2 business course.', 'B2 бизнес ағылшын курсынан кейін қызметі өсті.'],
    duration: ['8 месяцев', '8 months', '8 ай'],
  },
} as const;

const lessonText = {
  'lesson-1': {
    title: ['Введение в английский', 'Introduction to English', 'Ағылшын тіліне кіріспе'],
    description: ['Изучите приветствия и знакомство.', 'Learn greetings and introductions.', 'Амандасу мен танысуды үйреніңіз.'],
  },
  'lesson-2': {
    title: ['Числа и счет', 'Numbers and Counting', 'Сандар және санау'],
    description: ['Освойте числа от 1 до 100.', 'Master numbers from 1 to 100.', '1-ден 100-ге дейінгі сандарды меңгеріңіз.'],
  },
  'lesson-3': {
    title: ['Практика Past Simple', 'Past Simple Practice', 'Past Simple практикасы'],
    description: ['Используйте Past Simple с правильными и неправильными глаголами.', 'Use past simple with regular and irregular verbs.', 'Дұрыс және бұрыс етістіктермен Past Simple қолданыңыз.'],
  },
} as const;

const scheduleText = {
  'schedule-1': ['Урок 19: Ежедневные дела', 'Lesson 19: Daily Routines', '19-сабақ: Күнделікті істер'],
  'schedule-2': ['Грамматика: прошедшие времена', 'Grammar: Past Tenses', 'Грамматика: өткен шақтар'],
  'schedule-3': ['Бизнес-английский: презентации', 'Business English: Presentations', 'Бизнес ағылшын: презентациялар'],
} as const;

function langIndex(language?: string) {
  if (language?.startsWith('en')) return 1;
  if (language?.startsWith('kk')) return 2;
  return 0;
}

export function localizeCourses(courses: Course[], language?: string): Course[] {
  const index = langIndex(language);
  return courses.map((course) => {
    const text = courseText[course.id as keyof typeof courseText];
    return text ? { ...course, title: text.title[index], description: text.description[index], duration: text.duration[index], skills: [...text.skills[index]] } : course;
  });
}

export function localizePricingPlans(plans: PricingPlan[], language?: string): PricingPlan[] {
  const index = langIndex(language);
  return plans.map((plan) => {
    const text = pricingText[plan.id as keyof typeof pricingText];
    return text ? { ...plan, name: text.name[index], period: text.period[index], description: text.description[index], features: [...text.features[index]], notIncluded: [...text.notIncluded[index]] } : plan;
  });
}

export function localizeStories(stories: SuccessStory[], language?: string): SuccessStory[] {
  const index = langIndex(language);
  return stories.map((story) => {
    const text = storyText[story.id as keyof typeof storyText];
    return text ? { ...story, country: text.country[index], achievement: text.achievement[index], story: text.story[index], duration: text.duration[index] } : story;
  });
}

export function localizeLessons(lessons: Lesson[], language?: string): Lesson[] {
  const index = langIndex(language);
  return lessons.map((lesson) => {
    const text = lessonText[lesson.id as keyof typeof lessonText];
    return text ? { ...lesson, title: text.title[index], description: text.description[index] } : lesson;
  });
}

export function localizeSchedules(schedules: ScheduleLesson[], t: TFunction, language?: string): ScheduleLesson[] {
  const index = langIndex(language);
  return schedules.map((schedule) => ({
    ...schedule,
    title: scheduleText[schedule.id as keyof typeof scheduleText]?.[index] || schedule.title,
    type: schedule.type === 'individual'
      ? t('schedule.individual', { defaultValue: index === 2 ? 'жеке' : index === 1 ? 'individual' : 'индивидуальный' })
      : t('schedule.group', { defaultValue: index === 2 ? 'топтық' : index === 1 ? 'group' : 'групповой' }),
  }));
}
