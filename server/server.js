const express   = require('express');
const cors      = require('cors');
const { Pool }  = require('pg');
const multer    = require('multer');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Cloudinary ───────────────────────────────────────────────────────────────
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

// ── Multer (memory storage → Cloudinary) ─────────────────────────────────────
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    const ext = file.originalname.split('.').pop().toLowerCase();
    if (file.fieldname === 'ideaFile') {
      if (['pdf', 'ppt', 'pptx'].includes(ext)) return cb(null, true);
      return cb(new Error('Only PDF and PPT/PPTX allowed for ideas.'));
    }
    if (file.fieldname === 'paymentProof') {
      if (['jpg', 'jpeg', 'png', 'webp'].includes(ext)) return cb(null, true);
      return cb(new Error('Only JPG, PNG, WEBP allowed for payment proof.'));
    }
    cb(null, true);
  },
});

// Helper: upload buffer → Cloudinary, return secure_url
function uploadToCloudinary(buffer, folder, resourceType = 'raw') {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
}

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
app.post(
  '/api/register',
  upload.fields([
    { name: 'ideaFile',     maxCount: 1 },
    { name: 'paymentProof', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        teamName, track, leaderName, leaderEmail, leaderPhone,
        leaderCollege, member2, member3, member4,
        ideaTitle, ideaBrief, disabilityProof, disabled,
        transactionId, paymentDate, payerName,
      } = req.body;

      // Upload files to Cloudinary if provided
      let ideaFileUrl     = null;
      let paymentProofUrl = null;

      if (req.files?.['ideaFile']?.[0]) {
        ideaFileUrl = await uploadToCloudinary(
          req.files['ideaFile'][0].buffer,
          'rcas-sankalp/ideas',
          'raw'
        );
      }
      if (req.files?.['paymentProof']?.[0]) {
        paymentProofUrl = await uploadToCloudinary(
          req.files['paymentProof'][0].buffer,
          'rcas-sankalp/payments',
          'image'
        );
      }

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
