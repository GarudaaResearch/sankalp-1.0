const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (file.fieldname === 'ideaFile') {
      const allowed = ['.pdf', '.ppt', '.pptx'];
      if (allowed.includes(ext)) return cb(null, true);
      return cb(new Error('Only PDF and PPT/PPTX allowed for ideas.'));
    }
    if (file.fieldname === 'paymentProof') {
      const allowed = ['.jpg', '.jpeg', '.png', '.webp'];
      if (allowed.includes(ext)) return cb(null, true);
      return cb(new Error('Only Images (JPG, PNG, WEBP) allowed for payment proof.'));
    }
    cb(null, true);
  }
});

// Database Setup
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    createTable();
  }
});

function createTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      teamName TEXT,
      track TEXT,
      leaderName TEXT,
      leaderEmail TEXT,
      leaderPhone TEXT,
      leaderCollege TEXT,
      member2 TEXT,
      member3 TEXT,
      member4 TEXT,
      ideaTitle TEXT,
      ideaBrief TEXT,
      ideaFile TEXT,
      disabilityProof TEXT,
      disabled INTEGER DEFAULT 0,
      transactionId TEXT,
      paymentDate TEXT,
      payerName TEXT,
      paymentProof TEXT,
      status TEXT DEFAULT 'pending',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;
  db.run(query, (err) => {
    if (err) console.error('Error creating table:', err.message);
    else {
      console.log('Registrations table ready.');
      // Add columns if they don't exist
      const cols = [
        'ideaFile TEXT',
        'transactionId TEXT',
        'paymentDate TEXT',
        'payerName TEXT',
        'paymentProof TEXT'
      ];
      cols.forEach(col => {
        db.run(`ALTER TABLE registrations ADD COLUMN ${col}`, (err) => {
          if (err && !err.message.includes('duplicate column name')) {
            console.error(`Error adding column ${col}:`, err.message);
          }
        });
      });
    }
  });
}

// API Routes

// GET all registrations
app.get('/api/registrations', (req, res) => {
  const query = `SELECT * FROM registrations ORDER BY id DESC`;
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// POST new registration (Handles Multiple Files)
app.post('/api/register', upload.fields([
  { name: 'ideaFile', maxCount: 1 },
  { name: 'paymentProof', maxCount: 1 }
]), (req, res) => {
  const {
    teamName, track, leaderName, leaderEmail, leaderPhone,
    leaderCollege, member2, member3, member4,
    ideaTitle, ideaBrief, disabilityProof, disabled, 
    transactionId, paymentDate, payerName
  } = req.body;

  const ideaFile = req.files['ideaFile'] ? req.files['ideaFile'][0].filename : null;
  const paymentProof = req.files['paymentProof'] ? req.files['paymentProof'][0].filename : null;

  const query = `
    INSERT INTO registrations (
      teamName, track, leaderName, leaderEmail, leaderPhone,
      leaderCollege, member2, member3, member4,
      ideaTitle, ideaBrief, ideaFile, disabilityProof, disabled,
      transactionId, paymentDate, payerName, paymentProof
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    teamName, track, leaderName, leaderEmail, leaderPhone,
    leaderCollege, member2, member3, member4,
    ideaTitle, ideaBrief, ideaFile, disabilityProof, disabled === 'true' || disabled === 1 ? 1 : 0,
    transactionId || null, paymentDate || null, payerName || null, paymentProof
  ];

  db.run(query, params, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ 
      message: 'Registration successful',
      id: this.lastID 
    });
  });
});

// PATCH update registration status
app.patch('/api/registrations/:id', (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  const query = `UPDATE registrations SET status = ? WHERE id = ?`;
  db.run(query, [status, id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ message: 'Registration not found' });
      return;
    }
    res.json({ message: 'Status updated successfully' });
  });
});

// Health check
app.get('/', (req, res) => {
  res.send('RCAS Hackathon Backend Running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

