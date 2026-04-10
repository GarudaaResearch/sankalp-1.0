const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  console.log('--- Table Schema ---');
  db.all("PRAGMA table_info(registrations)", (err, rows) => {
    if (err) console.error(err);
    else console.table(rows);
  });

  console.log('--- Latest 5 Registrations ---');
  db.all("SELECT id, teamName, ideaFile FROM registrations ORDER BY id DESC LIMIT 5", (err, rows) => {
    if (err) console.error(err);
    else console.table(rows);
  });
});

db.close();
