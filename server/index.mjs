import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import initSqlJs from 'sql.js';

const PORT = Number(process.env.PORT || 4000);
const DATA_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DATA_DIR, 'linguafirst.sqlite');

const seedTeachers = [
  ['teacher-1', 'Айсулу Каримова', 'Подготовка к IELTS', 'teacher@linguafirst.com'],
  ['teacher-2', 'Максим Туманов', 'Бизнес английский', 'teacher2@linguafirst.com'],
  ['teacher-3', 'Милана Ким', 'Дети и подростки', 'teacher3@linguafirst.com'],
  ['teacher-4', 'Даниял Сапар', 'Разговорная практика', 'teacher4@linguafirst.com'],
  ['teacher-5', 'Хаким Закиров', 'Грамматика и письмо', 'teacher5@linguafirst.com'],
  ['teacher-6', 'Анастасия Степаненко', 'Произношение и акцент', 'teacher6@linguafirst.com'],
];

const seedStudents = [
  ['student-1', 'Милана Валиева', 'maria.garcia@email.com', 'B1', 68, 'teacher-1'],
  ['student-2', 'John Smith', 'john.smith@email.com', 'A2', 45, 'teacher-1'],
  ['student-3', 'Sophie Chen', 'sophie.chen@email.com', '' +
  'C1', 85, 'teacher-1'],
  ['student-4', 'Ahmed Hassan', 'ahmed.hassan@email.com', 'B2', 52, null],
  ['student-5', 'Emma Rodriguez', 'emma.rodriguez@email.com', 'A1', 30, null],
];

const DEFAULT_PASSWORD = 'password';
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;

const seedUsers = [
  ['admin-1', 'Admin', 'admin@linguafirst.com', 'admin', null],
  ['teacher-1', 'РђР№СЃСѓР»Сѓ РљР°СЂРёРјРѕРІР°', 'teacher@linguafirst.com', 'teacher', 'teacher-1'],
  ['teacher-2', 'РњР°РєСЃРёРј РўСѓРјР°РЅРѕРІ', 'teacher2@linguafirst.com', 'teacher', 'teacher-2'],
  ['teacher-3', 'РњРёР»Р°РЅР° РљРёРј', 'teacher3@linguafirst.com', 'teacher', 'teacher-3'],
  ['teacher-4', 'Р”Р°РЅРёСЏР» РЎР°РїР°СЂ', 'teacher4@linguafirst.com', 'teacher', 'teacher-4'],
  ['teacher-5', 'РҐР°РєРёРј Р—Р°РєРёСЂРѕРІ', 'teacher5@linguafirst.com', 'teacher', 'teacher-5'],
  ['teacher-6', 'РђРЅР°СЃС‚Р°СЃРёСЏ РЎС‚РµРїР°РЅРµРЅРєРѕ', 'teacher6@linguafirst.com', 'teacher', 'teacher-6'],
  ['student-1', 'РњРёР»Р°РЅР° Р’Р°Р»РёРµРІР°', 'student@linguafirst.com', 'student', 'student-1'],
  ['student-2', 'John Smith', 'john.smith@email.com', 'student', 'student-2'],
  ['student-3', 'Sophie Chen', 'sophie.chen@email.com', 'student', 'student-3'],
  ['student-4', 'Ahmed Hassan', 'ahmed.hassan@email.com', 'student', 'student-4'],
  ['student-5', 'Emma Rodriguez', 'emma.rodriguez@email.com', 'student', 'student-5'],
];

function persist(db) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DB_PATH, Buffer.from(db.export()));
}

function run(db, sql, params = []) {
  const stmt = db.prepare(sql);
  stmt.run(params);
  stmt.free();
}

function all(db, sql, params = []) {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const rows = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}

function scalar(db, sql, params = []) {
  const rows = all(db, sql, params);
  return Number(Object.values(rows[0] || { count: 0 })[0]);
}

function one(db, sql, params = []) {
  return all(db, sql, params)[0] || null;
}

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, passwordHash) {
  const [salt, hash] = String(passwordHash || '').split(':');
  if (!salt || !hash) {
    return false;
  }

  const candidate = crypto.scryptSync(password, salt, 64);
  const stored = Buffer.from(hash, 'hex');
  return stored.length === candidate.length && crypto.timingSafeEqual(stored, candidate);
}

function publicUser(row) {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
  };
}

function createSession(db, userId) {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS).toISOString();
  run(db, 'INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)', [token, userId, expiresAt]);
  persist(db);
  return token;
}

function getAuthToken(req) {
  const authHeader = req.headers.authorization || '';
  return authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
}

function getCurrentUser(db, req) {
  const token = getAuthToken(req);
  if (!token) {
    return null;
  }

  return one(db, `
    SELECT users.id, users.name, users.email, users.role
    FROM sessions
    JOIN users ON users.id = sessions.user_id
    WHERE sessions.token = ? AND sessions.expires_at > ?
  `, [token, new Date().toISOString()]);
}

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const body = Buffer.concat(chunks).toString('utf8');
  return body ? JSON.parse(body) : {};
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });
  res.end(JSON.stringify(payload));
}

function initSchema(db) {
  run(db, `
    CREATE TABLE IF NOT EXISTS teachers (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      specialty TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE
    )
  `);
  run(db, `
    CREATE TABLE IF NOT EXISTS students (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      level TEXT NOT NULL,
      progress INTEGER NOT NULL DEFAULT 0,
      assigned_teacher_id TEXT,
      FOREIGN KEY (assigned_teacher_id) REFERENCES teachers(id)
    )
  `);
  run(db, `
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      role TEXT NOT NULL CHECK (role IN ('student', 'teacher', 'admin')),
      password_hash TEXT NOT NULL,
      profile_ref_id TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
  run(db, `
    CREATE TABLE IF NOT EXISTS sessions (
      token TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  if (scalar(db, 'SELECT COUNT(*) AS count FROM teachers') === 0) {
    seedTeachers.forEach((teacher) => {
      run(db, 'INSERT INTO teachers (id, name, specialty, email) VALUES (?, ?, ?, ?)', teacher);
    });
  }

  if (scalar(db, 'SELECT COUNT(*) AS count FROM students') === 0) {
    seedStudents.forEach((student) => {
      run(
        db,
        'INSERT INTO students (id, name, email, level, progress, assigned_teacher_id) VALUES (?, ?, ?, ?, ?, ?)',
        student,
      );
    });
  }

  seedUsers.forEach((user) => {
    const exists = scalar(db, 'SELECT COUNT(*) AS count FROM users WHERE email = ?', [user[2]]);
    if (!exists) {
      run(
        db,
        'INSERT INTO users (id, name, email, role, password_hash, profile_ref_id) VALUES (?, ?, ?, ?, ?, ?)',
        [user[0], user[1], user[2], user[3], hashPassword(DEFAULT_PASSWORD), user[4]],
      );
    }
  });
}

const SQL = await initSqlJs({
  locateFile: (file) => path.join(process.cwd(), 'node_modules', 'sql.js', 'dist', file),
});

const db = fs.existsSync(DB_PATH)
  ? new SQL.Database(fs.readFileSync(DB_PATH))
  : new SQL.Database();

initSchema(db);
persist(db);

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url || '/', `http://${req.headers.host}`);

    if (req.method === 'OPTIONS') {
      sendJson(res, 204, {});
      return;
    }

    if (req.method === 'POST' && url.pathname === '/api/auth/login') {
      const { email, password } = await readJson(req);
      const user = one(db, 'SELECT id, name, email, role, password_hash FROM users WHERE lower(email) = lower(?)', [email || '']);

      if (!user || !verifyPassword(password || '', user.password_hash)) {
        sendJson(res, 401, { error: 'Invalid email or password' });
        return;
      }

      const token = createSession(db, user.id);
      sendJson(res, 200, { token, user: publicUser(user) });
      return;
    }

    if (req.method === 'POST' && url.pathname === '/api/auth/signup') {
      const { email, password, name, role } = await readJson(req);
      const userRole = ['student', 'teacher', 'admin'].includes(role) ? role : 'student';

      if (!email || !password || !name) {
        sendJson(res, 400, { error: 'Name, email and password are required' });
        return;
      }

      if (String(password).length < 6) {
        sendJson(res, 400, { error: 'Password must be at least 6 characters' });
        return;
      }

      const exists = scalar(db, 'SELECT COUNT(*) AS count FROM users WHERE lower(email) = lower(?)', [email]);
      if (exists) {
        sendJson(res, 409, { error: 'Email already exists' });
        return;
      }

      const id = `${userRole}-${crypto.randomUUID()}`;
      let profileRefId = null;

      if (userRole === 'teacher') {
        profileRefId = id;
        run(db, 'INSERT INTO teachers (id, name, specialty, email) VALUES (?, ?, ?, ?)', [
          profileRefId,
          name,
          'General English',
          email,
        ]);
      }

      if (userRole === 'student') {
        profileRefId = id;
        run(db, 'INSERT INTO students (id, name, email, level, progress, assigned_teacher_id) VALUES (?, ?, ?, ?, ?, ?)', [
          profileRefId,
          name,
          email,
          'A1',
          0,
          null,
        ]);
      }

      run(
        db,
        'INSERT INTO users (id, name, email, role, password_hash, profile_ref_id) VALUES (?, ?, ?, ?, ?, ?)',
        [id, name, email, userRole, hashPassword(password), profileRefId],
      );

      const token = createSession(db, id);
      sendJson(res, 201, { token, user: { id, name, email, role: userRole } });
      return;
    }

    if (req.method === 'GET' && url.pathname === '/api/auth/me') {
      const user = getCurrentUser(db, req);
      if (!user) {
        sendJson(res, 401, { error: 'Unauthorized' });
        return;
      }

      sendJson(res, 200, { user: publicUser(user) });
      return;
    }

    if (req.method === 'POST' && url.pathname === '/api/auth/logout') {
      const token = getAuthToken(req);
      if (token) {
        run(db, 'DELETE FROM sessions WHERE token = ?', [token]);
        persist(db);
      }

      sendJson(res, 200, { ok: true });
      return;
    }

    if (req.method === 'GET' && url.pathname === '/api/teachers') {
      sendJson(res, 200, all(db, 'SELECT id, name, specialty, email FROM teachers ORDER BY name'));
      return;
    }

    if (req.method === 'GET' && url.pathname === '/api/students') {
      sendJson(
        res,
        200,
        all(db, `
          SELECT
            id,
            name,
            email,
            level,
            progress,
            assigned_teacher_id AS assignedTeacherId
          FROM students
          ORDER BY name
        `),
      );
      return;
    }

    const assignmentMatch = url.pathname.match(/^\/api\/students\/([^/]+)\/teacher$/);
    if (req.method === 'PATCH' && assignmentMatch) {
      const currentUser = getCurrentUser(db, req);
      if (!currentUser || currentUser.role !== 'admin') {
        sendJson(res, 403, { error: 'Admin access required' });
        return;
      }

      const { teacherId } = await readJson(req);
      const studentId = decodeURIComponent(assignmentMatch[1]);
      const nextTeacherId = teacherId || null;

      if (nextTeacherId) {
        const teacherExists = scalar(db, 'SELECT COUNT(*) AS count FROM teachers WHERE id = ?', [nextTeacherId]);
        if (!teacherExists) {
          sendJson(res, 404, { error: 'Teacher not found' });
          return;
        }
      }

      const studentExists = scalar(db, 'SELECT COUNT(*) AS count FROM students WHERE id = ?', [studentId]);
      if (!studentExists) {
        sendJson(res, 404, { error: 'Student not found' });
        return;
      }

      run(db, 'UPDATE students SET assigned_teacher_id = ? WHERE id = ?', [nextTeacherId, studentId]);
      persist(db);
      sendJson(res, 200, { ok: true });
      return;
    }

    sendJson(res, 404, { error: 'Not found' });
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { error: 'Internal server error' });
  }
});

server.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
  console.log(`SQLite database: ${DB_PATH}`);
});
