const express   = require('express');
const cors      = require('cors');
const { Pool }  = require('pg');
require('dotenv').config();

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── PostgreSQL Pool ───────────────────────────────────────────────────────────
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// ── DB Init ───────────────────────────────────────────────────────────────────
async function createTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS registrations (
      id               SERIAL PRIMARY KEY,
      "teamName"       TEXT,
      track            TEXT,
      "leaderName"     TEXT,
      "leaderEmail"    TEXT,
      "leaderPhone"    TEXT,
      "leaderCollege"  TEXT,
      member2          TEXT,
      member3          TEXT,
      member4          TEXT,
      "ideaTitle"      TEXT,
      "ideaBrief"      TEXT,
      "ideaFile"       TEXT,
      "disabilityProof" TEXT,
      disabled         INTEGER DEFAULT 0,
      "transactionId"  TEXT,
      "paymentDate"    TEXT,
      "payerName"      TEXT,
      "paymentProof"   TEXT,
      status           TEXT DEFAULT 'pending',
      "createdAt"      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  try {
    await pool.query(query);
    console.log('Registrations table ready.');
  } catch (err) {
    console.error('Error creating table:', err.message);
  }
}
createTable();

// No file uploads; using direct URLs

// ── Routes ────────────────────────────────────────────────────────────────────

// GET all registrations
app.get('/api/registrations', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM registrations ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new registration
app.post('/api/register', async (req, res) => {
    try {
      const {
        teamName, track, leaderName, leaderEmail, leaderPhone,
        leaderCollege, member2, member3, member4,
        ideaTitle, ideaBrief, ideaFile, disabilityProof, disabled,
        transactionId, paymentDate, payerName, paymentProof
      } = req.body;

      let ideaFileUrl     = ideaFile || null;
      let paymentProofUrl = paymentProof || null;

      const query = `
        INSERT INTO registrations (
          "teamName", track, "leaderName", "leaderEmail", "leaderPhone",
          "leaderCollege", member2, member3, member4,
          "ideaTitle", "ideaBrief", "ideaFile", "disabilityProof", disabled,
          "transactionId", "paymentDate", "payerName", "paymentProof"
        ) VALUES (
          $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18
        )
        RETURNING id
      `;

      const params = [
        teamName, track, leaderName, leaderEmail, leaderPhone,
        leaderCollege,
        member2  || null,
        member3  || null,
        member4  || null,
        ideaTitle, ideaBrief,
        ideaFileUrl,
        disabilityProof || null,
        disabled === 'true' || disabled === '1' ? 1 : 0,
        transactionId   || null,
        paymentDate     || null,
        payerName       || null,
        paymentProofUrl,
      ];

      const result = await pool.query(query, params);
      res.status(201).json({ message: 'Registration successful', id: result.rows[0].id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// PATCH update status
app.patch('/api/registrations/:id', async (req, res) => {
  const { status } = req.body;
  const { id }     = req.params;
  try {
    const result = await pool.query(
      'UPDATE registrations SET status = $1 WHERE id = $2',
      [status, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Registration not found' });
    }
    res.json({ message: 'Status updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Health check
app.get('/', (req, res) => {
  res.send('RCAS Hackathon Backend Running ✅');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
