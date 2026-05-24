import http from 'node:http';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { Pool } from 'pg';

function loadEnvFile() {
  const envPath = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue;
    const index = trimmed.indexOf('=');
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim().replace(/^["']|["']$/g, '');
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadEnvFile();

const PORT = Number(process.env.PORT || 4000);
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/linguafirst';
const DATABASE_SCHEMA = process.env.DATABASE_SCHEMA || 'linguafirst';
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;
const DEFAULT_PASSWORD = 'password';
const SIGNUP_EMAIL_PATTERN = /^[^@\s]+@linguafirst\.com$/i;

if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(DATABASE_SCHEMA)) {
  console.error('DATABASE_SCHEMA must contain only letters, numbers and underscores, and must not start with a number.');
  process.exit(1);
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : undefined,
  options: `-c search_path=${DATABASE_SCHEMA},public`,
});

const teachers = [
  ['teacher-1', 'Aisulu Karimova', 'C1', 'IELTS preparation', 'teacher@linguafirst.com'],
  ['teacher-2', 'Maxim Tumanov', 'C1', 'Business English', 'teacher2@linguafirst.com'],
  ['teacher-3', 'Milana Kim', 'B2', 'Children and teenagers', 'teacher3@linguafirst.com'],
  ['teacher-4', 'Daniyal Sapar', 'C1', 'Speaking practice', 'teacher4@linguafirst.com'],
  ['teacher-5', 'Hakim Zakirov', 'B2', 'Grammar and writing', 'teacher5@linguafirst.com'],
  ['teacher-6', 'Anastasia Stepanenko', 'C1', 'Pronunciation and accent', 'teacher6@linguafirst.com'],
];

const students = [
  ['student-1', 'Milana Valieva', 'student@linguafirst.com', 'B1', 68, 'teacher-1'],
  ['student-2', 'John Smith', 'john.smith@email.com', 'A2', 45, 'teacher-1'],
  ['student-3', 'Sophie Chen', 'sophie.chen@email.com', 'C1', 85, 'teacher-1'],
  ['student-4', 'Ahmed Hassan', 'ahmed.hassan@email.com', 'B2', 52, 'teacher-2'],
  ['student-5', 'Emma Rodriguez', 'emma.rodriguez@email.com', 'A1', 30, null],
];

const courses = [
  ['a1', 'A1', 'Beginner', 'Start learning English from zero.', '3 months', 24, 75000, 'bg-green-500', ['Basic vocabulary', 'Simple grammar', 'Everyday phrases']],
  ['a2', 'A2', 'Elementary', 'Build confidence with everyday English.', '3 months', 24, 117000, 'bg-blue-500', ['Wider vocabulary', 'Past tenses', 'Common expressions']],
  ['b1', 'B1', 'Intermediate', 'Speak more freely in practical situations.', '4 months', 32, 140000, 'bg-purple-500', ['Complex sentences', 'Idioms', 'Work communication']],
  ['b2', 'B2', 'Upper Intermediate', 'Use advanced structures and precise vocabulary.', '4 months', 32, 165000, 'bg-orange-500', ['Advanced grammar', 'Fluent discussions', 'Academic writing']],
  ['c1', 'C1', 'Advanced', 'Reach confident, near-native communication.', '5 months', 40, 180000, 'bg-red-500', ['Natural fluency', 'Nuanced communication', 'Exam-level writing']],
];

const lessons = [
  ['lesson-1', 'a1', 'Introduction to English', 'Learn greetings and introductions.', 45, 'https://example.com/video1.mp4', [
    { type: 'multiple-choice', question: 'What is the correct greeting?', options: ['Hello', 'Hola', 'Bonjour', 'Ciao'], correct: 0 },
    { type: 'multiple-choice', question: 'Choose the correct sentence.', options: ['I am Anna', 'I is Anna', 'I are Anna', 'I be Anna'], correct: 0 },
  ]],
  ['lesson-2', 'a1', 'Numbers and Counting', 'Master numbers from 1 to 100.', 50, 'https://example.com/video2.mp4', [
    { type: 'multiple-choice', question: 'What number comes after nine?', options: ['Eight', 'Ten', 'Seven', 'Six'], correct: 1 },
  ]],
  ['lesson-3', 'b1', 'Past Simple Practice', 'Use past simple with regular and irregular verbs.', 45, 'https://example.com/video3.mp4', [
    { type: 'multiple-choice', question: 'What is the past tense of "go"?', options: ['goed', 'went', 'gone', 'going'], correct: 1 },
    { type: 'multiple-choice', question: 'Which sentence is correct?', options: ['She go to school', 'She goes to school', 'She going to school', 'She goed to school'], correct: 1 },
  ]],
];

const schedules = [
  ['schedule-1', 'Lesson 19: Daily Routines', 'teacher-1', 'student-1', '2026-05-18', '10:00', 60, 'group', 'scheduled', '/student/video-call/1'],
  ['schedule-2', 'Grammar: Past Tenses', 'teacher-1', 'student-2', '2026-05-20', '14:00', 60, 'individual', 'scheduled', '/student/video-call/2'],
  ['schedule-3', 'Business English: Presentations', 'teacher-2', 'student-4', '2026-05-21', '15:30', 60, 'individual', 'scheduled', '/student/video-call/3'],
];

const progressRows = [
  ['student-1', 'b1', 65, 18, 32, 12, 24.5],
  ['student-2', 'a2', 45, 12, 24, 7, 15],
  ['student-3', 'c1', 85, 28, 32, 18, 42],
  ['student-4', 'b2', 52, 16, 32, 8, 21],
  ['student-5', 'a1', 30, 8, 24, 4, 9],
];

const pricingPlans = [
  ['basic', 'Basic', 25000, 'month', 'Good start for beginners.', ['4 group lessons per month', 'Learning materials', 'Community forum', 'Progress tracking'], ['Individual lessons', 'Homework review', 'Certificate'], false],
  ['standard', 'Standard', 50000, 'month', 'Most popular plan for steady learning.', ['8 group lessons per month', '2 individual lessons per month', 'All materials', 'Homework review', 'Monthly testing'], ['Certificate'], true],
  ['premium', 'Premium', 90000, 'month', 'Maximum flexibility and personal support.', ['Unlimited group lessons', '8 individual lessons per month', 'Priority support', 'Homework review', 'Certificate'], [], false],
];

const successStories = [
  ['story-1', 'Milana Valieva', 'Astana', 'IELTS 8.0', 'From B1 to C1 in six months, now studying abroad.', 'B1', 'C1', '6 months'],
  ['story-2', 'Ahmed Hassan', 'Aktau', 'IELTS 7.5', 'Improved speaking from 5.5 to 7.5 and got a new role.', 'B1', 'B2', '4 months'],
  ['story-3', 'Yuki Tanaka', 'Almaty', 'Business English', 'Promoted after completing the B2 business course.', 'A2', 'B2', '8 months'],
];

const levelQuestions = [
  [1, 'Hello, my name ___ John.', ['am', 'is', 'are', 'be'], 1, 'A1'],
  [2, 'I ___ to the cinema yesterday.', ['go', 'goes', 'went', 'going'], 2, 'A2'],
  [3, 'If I ___ you, I would accept the offer.', ['am', 'was', 'were', 'be'], 2, 'B1'],
  [4, 'By the time you arrive, I ___ the report.', ['finish', 'will finish', 'will have finished', 'finished'], 2, 'B2'],
  [5, 'The committee ___ the proposal after much deliberation.', ['has ratified', 'have ratified', 'ratified', 'ratifying'], 0, 'C1'],
  [6, '___ books are on the table?', ['Whose', 'Who', 'Whom', 'Which'], 0, 'A1'],
  [7, 'She ___ studying for three hours.', ['is', 'has been', 'was', 'had'], 1, 'A2'],
  [8, 'I wish I ___ more time to travel.', ['have', 'had', 'will have', 'would have'], 1, 'B1'],
  [9, 'The project, ___ was due last week, has been postponed.', ['that', 'which', 'what', 'who'], 1, 'B2'],
  [10, 'Scarcely ___ the meeting started when the fire alarm rang.', ['did', 'had', 'has', 'was'], 1, 'C1'],
];

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  return `${salt}:${crypto.scryptSync(password, salt, 64).toString('hex')}`;
}

function verifyPassword(password, passwordHash) {
  const [salt, hash] = String(passwordHash || '').split(':');
  if (!salt || !hash) return false;
  const candidate = crypto.scryptSync(password, salt, 64);
  const stored = Buffer.from(hash, 'hex');
  return stored.length === candidate.length && crypto.timingSafeEqual(stored, candidate);
}

async function query(sql, params = []) {
  return pool.query(sql, params);
}

async function one(sql, params = []) {
  const result = await query(sql, params);
  return result.rows[0] || null;
}

async function initDb() {
  await query(`CREATE SCHEMA IF NOT EXISTS ${DATABASE_SCHEMA}`);

  await query(`
    CREATE TABLE IF NOT EXISTS teachers (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      level TEXT NOT NULL DEFAULT 'B2',
      specialty TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS teacher_deletions (
      teacher_id TEXT PRIMARY KEY,
      deleted_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS students (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      level TEXT NOT NULL,
      progress INTEGER NOT NULL DEFAULT 0,
      assigned_teacher_id TEXT REFERENCES teachers(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      role TEXT NOT NULL CHECK (role IN ('student', 'teacher', 'admin')),
      password_hash TEXT NOT NULL,
      profile_ref_id TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS sessions (
      token TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      expires_at TIMESTAMPTZ NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS courses (
      id TEXT PRIMARY KEY,
      level TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      duration TEXT NOT NULL,
      lessons INTEGER NOT NULL,
      price INTEGER NOT NULL,
      color TEXT NOT NULL,
      skills JSONB NOT NULL DEFAULT '[]'
    );

    CREATE TABLE IF NOT EXISTS lessons (
      id TEXT PRIMARY KEY,
      course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      duration INTEGER NOT NULL,
      video_url TEXT,
      exercises JSONB NOT NULL DEFAULT '[]',
      created_by TEXT REFERENCES users(id) ON DELETE SET NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS lesson_progress (
      student_id TEXT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
      lesson_id TEXT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
      completed BOOLEAN NOT NULL DEFAULT false,
      completed_at TIMESTAMPTZ,
      PRIMARY KEY (student_id, lesson_id)
    );

    CREATE TABLE IF NOT EXISTS schedules (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      teacher_id TEXT NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
      student_id TEXT REFERENCES students(id) ON DELETE SET NULL,
      date DATE NOT NULL,
      time TEXT NOT NULL,
      duration INTEGER NOT NULL,
      type TEXT NOT NULL,
      status TEXT NOT NULL,
      link TEXT
    );

    CREATE TABLE IF NOT EXISTS student_progress (
      student_id TEXT PRIMARY KEY REFERENCES students(id) ON DELETE CASCADE,
      course_id TEXT REFERENCES courses(id) ON DELETE SET NULL,
      overall_progress INTEGER NOT NULL DEFAULT 0,
      lessons_completed INTEGER NOT NULL DEFAULT 0,
      total_lessons INTEGER NOT NULL DEFAULT 24,
      study_streak INTEGER NOT NULL DEFAULT 0,
      hours_studied NUMERIC NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS pricing_plans (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      price INTEGER NOT NULL,
      period TEXT NOT NULL,
      description TEXT NOT NULL,
      features JSONB NOT NULL DEFAULT '[]',
      not_included JSONB NOT NULL DEFAULT '[]',
      popular BOOLEAN NOT NULL DEFAULT false
    );

    CREATE TABLE IF NOT EXISTS success_stories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      country TEXT NOT NULL,
      achievement TEXT NOT NULL,
      story TEXT NOT NULL,
      before_level TEXT NOT NULL,
      after_level TEXT NOT NULL,
      duration TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS level_test_questions (
      id INTEGER PRIMARY KEY,
      question TEXT NOT NULL,
      options JSONB NOT NULL DEFAULT '[]',
      correct INTEGER NOT NULL,
      level TEXT NOT NULL
    );
  `);

  await query("ALTER TABLE teachers ADD COLUMN IF NOT EXISTS level TEXT NOT NULL DEFAULT 'B2'");
  const deletedTeacherIds = new Set((await query('SELECT teacher_id FROM teacher_deletions')).rows.map((row) => row.teacher_id));

  for (const teacher of teachers) {
    if (deletedTeacherIds.has(teacher[0])) continue;
    await query(
      `INSERT INTO teachers (id, name, level, specialty, email)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, level = EXCLUDED.level, specialty = EXCLUDED.specialty, email = EXCLUDED.email`,
      teacher,
    );
  }

  for (const student of students) {
    const assignedTeacherId = deletedTeacherIds.has(student[5]) ? null : student[5];
    await query(
      `INSERT INTO students (id, name, email, level, progress, assigned_teacher_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, email = EXCLUDED.email, level = EXCLUDED.level, progress = EXCLUDED.progress, assigned_teacher_id = EXCLUDED.assigned_teacher_id`,
      [...student.slice(0, 5), assignedTeacherId],
    );
  }

  const users = [
    ['admin-1', 'Admin', 'admin@linguafirst.com', 'admin', null],
    ...teachers.filter(([id]) => !deletedTeacherIds.has(id)).map(([id, name, , , email]) => [id, name, email, 'teacher', id]),
    ...students.map(([id, name, email]) => [id, name, email, 'student', id]),
  ];

  for (const user of users) {
    const existing = await one('SELECT password_hash FROM users WHERE id = $1', [user[0]]);
    await query(
      `INSERT INTO users (id, name, email, role, password_hash, profile_ref_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, email = EXCLUDED.email, role = EXCLUDED.role, profile_ref_id = EXCLUDED.profile_ref_id`,
      [user[0], user[1], user[2], user[3], existing?.password_hash || hashPassword(DEFAULT_PASSWORD), user[4]],
    );
  }

  for (const course of courses) {
    await query(
      `INSERT INTO courses (id, level, title, description, duration, lessons, price, color, skills)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb)
       ON CONFLICT (id) DO UPDATE SET level = EXCLUDED.level, title = EXCLUDED.title, description = EXCLUDED.description, duration = EXCLUDED.duration, lessons = EXCLUDED.lessons, price = EXCLUDED.price, color = EXCLUDED.color, skills = EXCLUDED.skills`,
      [...course.slice(0, 8), JSON.stringify(course[8])],
    );
  }

  for (const lesson of lessons) {
    const createdBy = deletedTeacherIds.has('teacher-1') ? null : 'teacher-1';
    await query(
      `INSERT INTO lessons (id, course_id, title, description, duration, video_url, exercises, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, $8)
       ON CONFLICT (id) DO UPDATE SET course_id = EXCLUDED.course_id, title = EXCLUDED.title, description = EXCLUDED.description, duration = EXCLUDED.duration, video_url = EXCLUDED.video_url, exercises = EXCLUDED.exercises`,
      [...lesson.slice(0, 6), JSON.stringify(lesson[6]), createdBy],
    );
  }

  for (const schedule of schedules) {
    if (deletedTeacherIds.has(schedule[2])) continue;
    await query(
      `INSERT INTO schedules (id, title, teacher_id, student_id, date, time, duration, type, status, link)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, teacher_id = EXCLUDED.teacher_id, student_id = EXCLUDED.student_id, date = EXCLUDED.date, time = EXCLUDED.time, duration = EXCLUDED.duration, type = EXCLUDED.type, status = EXCLUDED.status, link = EXCLUDED.link`,
      schedule,
    );
  }

  for (const progress of progressRows) {
    await query(
      `INSERT INTO student_progress (student_id, course_id, overall_progress, lessons_completed, total_lessons, study_streak, hours_studied)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (student_id) DO UPDATE SET course_id = EXCLUDED.course_id, overall_progress = EXCLUDED.overall_progress, lessons_completed = EXCLUDED.lessons_completed, total_lessons = EXCLUDED.total_lessons, study_streak = EXCLUDED.study_streak, hours_studied = EXCLUDED.hours_studied`,
      progress,
    );
  }

  for (const plan of pricingPlans) {
    await query(
      `INSERT INTO pricing_plans (id, name, price, period, description, features, not_included, popular)
       VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7::jsonb, $8)
       ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, period = EXCLUDED.period, description = EXCLUDED.description, features = EXCLUDED.features, not_included = EXCLUDED.not_included, popular = EXCLUDED.popular`,
      [plan[0], plan[1], plan[2], plan[3], plan[4], JSON.stringify(plan[5]), JSON.stringify(plan[6]), plan[7]],
    );
  }

  for (const story of successStories) {
    await query(
      `INSERT INTO success_stories (id, name, country, achievement, story, before_level, after_level, duration)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, country = EXCLUDED.country, achievement = EXCLUDED.achievement, story = EXCLUDED.story, before_level = EXCLUDED.before_level, after_level = EXCLUDED.after_level, duration = EXCLUDED.duration`,
      story,
    );
  }

  for (const question of levelQuestions) {
    await query(
      `INSERT INTO level_test_questions (id, question, options, correct, level)
       VALUES ($1, $2, $3::jsonb, $4, $5)
       ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, correct = EXCLUDED.correct, level = EXCLUDED.level`,
      [question[0], question[1], JSON.stringify(question[2]), question[3], question[4]],
    );
  }
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });
  res.end(status === 204 ? '' : JSON.stringify(payload));
}

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const body = Buffer.concat(chunks).toString('utf8');
  return body ? JSON.parse(body) : {};
}

function getAuthToken(req) {
  const authHeader = req.headers.authorization || '';
  return authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
}

function publicUser(user) {
  return user ? { id: user.id, name: user.name, email: user.email, role: user.role } : null;
}

async function getCurrentUser(req) {
  const token = getAuthToken(req);
  if (!token) return null;

  return one(
    `SELECT users.id, users.name, users.email, users.role, users.profile_ref_id AS "profileRefId"
     FROM sessions
     JOIN users ON users.id = sessions.user_id
     WHERE sessions.token = $1 AND sessions.expires_at > now()`,
    [token],
  );
}

async function requireUser(req, res, roles = []) {
  const user = await getCurrentUser(req);
  if (!user) {
    sendJson(res, 401, { error: 'Unauthorized' });
    return null;
  }
  if (roles.length && !roles.includes(user.role)) {
    sendJson(res, 403, { error: 'Access denied' });
    return null;
  }
  return user;
}

async function createSession(userId) {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
  await query('INSERT INTO sessions (token, user_id, expires_at) VALUES ($1, $2, $3)', [token, userId, expiresAt]);
  return token;
}

function mapCourse(row) {
  return {
    id: row.id,
    level: row.level,
    title: row.title,
    description: row.description,
    duration: row.duration,
    lessons: Number(row.lessons),
    price: Number(row.price),
    color: row.color,
    skills: row.skills || [],
  };
}

function mapLesson(row) {
  return {
    id: row.id,
    courseId: row.course_id,
    title: row.title,
    description: row.description,
    duration: Number(row.duration),
    videoUrl: row.video_url || '',
    exercises: row.exercises || [],
    completed: Boolean(row.completed),
  };
}

function mapSchedule(row) {
  return {
    id: row.id,
    title: row.title,
    teacher: row.teacher_name,
    teacherId: row.teacher_id,
    studentId: row.student_id,
    date: row.date instanceof Date ? row.date.toISOString().slice(0, 10) : row.date,
    time: row.time,
    duration: Number(row.duration),
    type: row.type,
    status: row.status,
    link: row.link || '',
  };
}

async function route(req, res) {
  const url = new URL(req.url || '/', `http://${req.headers.host}`);

  if (req.method === 'OPTIONS') return sendJson(res, 204, {});
  if (req.method === 'GET' && url.pathname === '/api/health') return sendJson(res, 200, { ok: true, db: 'postgresql' });

  if (req.method === 'POST' && url.pathname === '/api/auth/login') {
    const { email, password } = await readJson(req);
    const user = await one('SELECT id, name, email, role, password_hash FROM users WHERE lower(email) = lower($1)', [email || '']);
    if (!user || !verifyPassword(password || '', user.password_hash)) {
      return sendJson(res, 401, { error: 'Invalid email or password' });
    }
    return sendJson(res, 200, { token: await createSession(user.id), user: publicUser(user) });
  }

  if (req.method === 'POST' && url.pathname === '/api/auth/signup') {
    const { email, password, name, role } = await readJson(req);
    const userRole = ['student', 'teacher', 'admin'].includes(role) ? role : 'student';
    const normalizedEmail = String(email || '').trim().toLowerCase();

    if (!email || !password || !name) return sendJson(res, 400, { error: 'Name, email and password are required' });
    if (!SIGNUP_EMAIL_PATTERN.test(normalizedEmail)) {
      return sendJson(res, 400, { error: 'Registration is available only with @linguafirst.com email addresses' });
    }
    if (String(password).length < 6) return sendJson(res, 400, { error: 'Password must be at least 6 characters' });
    if (await one('SELECT id FROM users WHERE lower(email) = lower($1)', [normalizedEmail])) return sendJson(res, 409, { error: 'Email already exists' });

    const id = `${userRole}-${crypto.randomUUID()}`;
    const profileRefId = userRole === 'admin' ? null : id;

    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      if (userRole === 'teacher') {
        await client.query('INSERT INTO teachers (id, name, level, specialty, email) VALUES ($1, $2, $3, $4, $5)', [id, name, 'B2', 'General English', normalizedEmail]);
      }
      if (userRole === 'student') {
        await client.query('INSERT INTO students (id, name, email, level, progress, assigned_teacher_id) VALUES ($1, $2, $3, $4, $5, $6)', [id, name, normalizedEmail, 'A1', 0, null]);
        await client.query('INSERT INTO student_progress (student_id, course_id, overall_progress, lessons_completed, total_lessons, study_streak, hours_studied) VALUES ($1, $2, $3, $4, $5, $6, $7)', [id, 'a1', 0, 0, 24, 0, 0]);
      }
      await client.query('INSERT INTO users (id, name, email, role, password_hash, profile_ref_id) VALUES ($1, $2, $3, $4, $5, $6)', [id, name, normalizedEmail, userRole, hashPassword(password), profileRefId]);
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }

    return sendJson(res, 201, { token: await createSession(id), user: { id, name, email: normalizedEmail, role: userRole } });
  }

  if (req.method === 'GET' && url.pathname === '/api/auth/me') {
    const user = await getCurrentUser(req);
    return user ? sendJson(res, 200, { user: publicUser(user) }) : sendJson(res, 401, { error: 'Unauthorized' });
  }

  if (req.method === 'POST' && url.pathname === '/api/auth/logout') {
    const token = getAuthToken(req);
    if (token) await query('DELETE FROM sessions WHERE token = $1', [token]);
    return sendJson(res, 200, { ok: true });
  }

  if (req.method === 'GET' && url.pathname === '/api/courses') {
    const result = await query('SELECT * FROM courses ORDER BY price');
    return sendJson(res, 200, result.rows.map(mapCourse));
  }

  if (req.method === 'GET' && url.pathname === '/api/pricing-plans') {
    const result = await query('SELECT * FROM pricing_plans ORDER BY price');
    return sendJson(res, 200, result.rows.map((row) => ({
      id: row.id,
      name: row.name,
      price: Number(row.price),
      period: row.period,
      description: row.description,
      features: row.features || [],
      notIncluded: row.not_included || [],
      popular: Boolean(row.popular),
    })));
  }

  if (req.method === 'GET' && url.pathname === '/api/success-stories') {
    const result = await query('SELECT * FROM success_stories ORDER BY id');
    return sendJson(res, 200, result.rows.map((row) => ({
      id: row.id,
      name: row.name,
      country: row.country,
      achievement: row.achievement,
      story: row.story,
      before: row.before_level,
      after: row.after_level,
      duration: row.duration,
    })));
  }

  if (req.method === 'GET' && url.pathname === '/api/level-test/questions') {
    const result = await query('SELECT * FROM level_test_questions ORDER BY id');
    return sendJson(res, 200, result.rows.map((row) => ({
      id: Number(row.id),
      question: row.question,
      options: row.options || [],
      correct: Number(row.correct),
      level: row.level,
    })));
  }

  if (req.method === 'GET' && url.pathname === '/api/teachers') {
    const result = await query('SELECT id, name, level, specialty, email FROM teachers ORDER BY name');
    return sendJson(res, 200, result.rows);
  }

  const teacherMatch = url.pathname.match(/^\/api\/teachers\/([^/]+)$/);
  if (req.method === 'DELETE' && teacherMatch) {
    const currentUser = await requireUser(req, res, ['admin']);
    if (!currentUser) return;

    const teacherId = decodeURIComponent(teacherMatch[1]);
    const teacher = await one('SELECT id FROM teachers WHERE id = $1', [teacherId]);
    if (!teacher) return sendJson(res, 404, { error: 'Teacher not found' });

    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query('INSERT INTO teacher_deletions (teacher_id) VALUES ($1) ON CONFLICT (teacher_id) DO UPDATE SET deleted_at = now()', [teacherId]);
      await client.query('DELETE FROM users WHERE id = $1 OR profile_ref_id = $1', [teacherId]);
      await client.query('DELETE FROM teachers WHERE id = $1', [teacherId]);
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }

    return sendJson(res, 200, { ok: true });
  }

  if (req.method === 'GET' && url.pathname === '/api/students') {
    const result = await query('SELECT id, name, email, level, progress, assigned_teacher_id AS "assignedTeacherId" FROM students ORDER BY name');
    return sendJson(res, 200, result.rows);
  }

  if (req.method === 'GET' && url.pathname === '/api/lessons') {
    const currentUser = await requireUser(req, res);
    if (!currentUser) return;
    const result = await query(
      `SELECT lessons.*, COALESCE(lesson_progress.completed, false) AS completed
       FROM lessons
       LEFT JOIN lesson_progress ON lesson_progress.lesson_id = lessons.id AND lesson_progress.student_id = $1
       ORDER BY lessons.course_id, lessons.id`,
      [currentUser.profileRefId || currentUser.id],
    );
    return sendJson(res, 200, result.rows.map(mapLesson));
  }

  const lessonMatch = url.pathname.match(/^\/api\/lessons\/([^/]+)$/);
  if (req.method === 'GET' && lessonMatch) {
    const currentUser = await requireUser(req, res);
    if (!currentUser) return;
    const lesson = await one(
      `SELECT lessons.*, COALESCE(lesson_progress.completed, false) AS completed
       FROM lessons
       LEFT JOIN lesson_progress ON lesson_progress.lesson_id = lessons.id AND lesson_progress.student_id = $1
       WHERE lessons.id = $2`,
      [currentUser.profileRefId || currentUser.id, decodeURIComponent(lessonMatch[1])],
    );
    return lesson ? sendJson(res, 200, mapLesson(lesson)) : sendJson(res, 404, { error: 'Lesson not found' });
  }

  if (req.method === 'POST' && url.pathname === '/api/lessons') {
    const currentUser = await requireUser(req, res, ['teacher', 'admin']);
    if (!currentUser) return;
    const body = await readJson(req);
    if (!body.title || !body.courseId) return sendJson(res, 400, { error: 'title and courseId are required' });
    const id = `lesson-${crypto.randomUUID()}`;
    await query(
      `INSERT INTO lessons (id, course_id, title, description, duration, video_url, exercises, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, $8)`,
      [id, body.courseId, body.title, body.description || '', Number(body.duration || 60), body.videoUrl || '', JSON.stringify(body.exercises || []), currentUser.id],
    );
    return sendJson(res, 201, { id });
  }

  const completeMatch = url.pathname.match(/^\/api\/lessons\/([^/]+)\/complete$/);
  if (req.method === 'POST' && completeMatch) {
    const currentUser = await requireUser(req, res, ['student']);
    if (!currentUser) return;
    const studentId = currentUser.profileRefId || currentUser.id;
    const lessonId = decodeURIComponent(completeMatch[1]);
    await query(
      `INSERT INTO lesson_progress (student_id, lesson_id, completed, completed_at)
       VALUES ($1, $2, true, now())
       ON CONFLICT (student_id, lesson_id) DO UPDATE SET completed = true, completed_at = now()`,
      [studentId, lessonId],
    );
    await query(
      `UPDATE student_progress
       SET lessons_completed = lessons_completed + 1,
           overall_progress = LEAST(100, overall_progress + 3),
           hours_studied = hours_studied + 0.75
       WHERE student_id = $1`,
      [studentId],
    );
    return sendJson(res, 200, { ok: true });
  }

  if (req.method === 'GET' && url.pathname === '/api/schedules') {
    const currentUser = await requireUser(req, res);
    if (!currentUser) return;
    const params = [];
    let where = '';
    if (currentUser.role === 'student') {
      params.push(currentUser.profileRefId || currentUser.id);
      where = 'WHERE schedules.student_id = $1';
    }
    if (currentUser.role === 'teacher') {
      params.push(currentUser.profileRefId || currentUser.id);
      where = 'WHERE schedules.teacher_id = $1';
    }
    const result = await query(
      `SELECT schedules.*, teachers.name AS teacher_name
       FROM schedules
       JOIN teachers ON teachers.id = schedules.teacher_id
       ${where}
       ORDER BY schedules.date, schedules.time`,
      params,
    );
    return sendJson(res, 200, result.rows.map(mapSchedule));
  }

  if (req.method === 'POST' && url.pathname === '/api/schedules') {
    const currentUser = await requireUser(req, res, ['teacher', 'admin']);
    if (!currentUser) return;
    const body = await readJson(req);
    if (!body.title || !body.date || !body.time || !body.teacherId) return sendJson(res, 400, { error: 'title, teacherId, date and time are required' });
    const id = `schedule-${crypto.randomUUID()}`;
    await query(
      `INSERT INTO schedules (id, title, teacher_id, student_id, date, time, duration, type, status, link)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [id, body.title, body.teacherId, body.studentId || null, body.date, body.time, Number(body.duration || 60), body.type || 'individual', 'scheduled', body.link || ''],
    );
    return sendJson(res, 201, { id });
  }

  if (req.method === 'GET' && url.pathname === '/api/student/progress') {
    const currentUser = await requireUser(req, res, ['student']);
    if (!currentUser) return;
    const row = await one('SELECT * FROM student_progress WHERE student_id = $1', [currentUser.profileRefId || currentUser.id]);
    return sendJson(res, 200, row ? {
      currentLevel: row.course_id ? String(row.course_id).toUpperCase() : 'A1',
      overallProgress: Number(row.overall_progress),
      lessonsCompleted: Number(row.lessons_completed),
      totalLessons: Number(row.total_lessons),
      studyStreak: Number(row.study_streak),
      hoursStudied: Number(row.hours_studied),
    } : null);
  }

  if (req.method === 'POST' && url.pathname === '/api/level-test/results') {
    const currentUser = await getCurrentUser(req);
    const { level, score } = await readJson(req);
    if (currentUser?.role === 'student' && level) {
      const studentId = currentUser.profileRefId || currentUser.id;
      const courseId = String(level).toLowerCase();
      await query('UPDATE students SET level = $1, progress = $2 WHERE id = $3', [level, Number(score || 0), studentId]);
      await query('UPDATE student_progress SET course_id = $1, overall_progress = $2 WHERE student_id = $3', [courseId, Number(score || 0), studentId]);
    }
    return sendJson(res, 200, { ok: true });
  }

  const assignmentMatch = url.pathname.match(/^\/api\/students\/([^/]+)\/teacher$/);
  if (req.method === 'PATCH' && assignmentMatch) {
    const currentUser = await requireUser(req, res, ['admin']);
    if (!currentUser) return;
    const { teacherId } = await readJson(req);
    const studentId = decodeURIComponent(assignmentMatch[1]);
    const nextTeacherId = teacherId || null;

    if (nextTeacherId && !(await one('SELECT id FROM teachers WHERE id = $1', [nextTeacherId]))) return sendJson(res, 404, { error: 'Teacher not found' });
    if (!(await one('SELECT id FROM students WHERE id = $1', [studentId]))) return sendJson(res, 404, { error: 'Student not found' });
    await query('UPDATE students SET assigned_teacher_id = $1 WHERE id = $2', [nextTeacherId, studentId]);
    return sendJson(res, 200, { ok: true });
  }

  return sendJson(res, 404, { error: 'Not found' });
}

try {
  await initDb();
} catch (error) {
  console.error('Failed to connect to PostgreSQL or initialize the database.');
  console.error(`DATABASE_URL: ${DATABASE_URL.replace(/:\/\/([^:]+):([^@]+)@/, '://$1:***@')}`);

  if (error?.code === '28P01') {
    console.error('PostgreSQL rejected the username or password. Update DATABASE_URL in .env.');
  } else if (error?.code === '3D000') {
    console.error('Database does not exist. Create it first, then run npm run server again.');
  } else if (error?.code === 'ECONNREFUSED') {
    console.error('PostgreSQL is not running or the host/port in DATABASE_URL is wrong.');
  } else {
    console.error(error);
  }

  process.exit(1);
}

const server = http.createServer(async (req, res) => {
  try {
    await route(req, res);
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { error: 'Internal server error' });
  }
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Stop the process that uses it or set another PORT in .env.`);
    process.exit(1);
  }

  console.error(error);
  process.exit(1);
});

server.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
  console.log('Database: PostgreSQL');
});
