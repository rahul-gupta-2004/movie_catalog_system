const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to SQLite database
const db = new sqlite3.Database('./movies_db.db');

// GET /movies
app.get('/movies', (req, res) => {
  db.all('SELECT * FROM movies', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST /movies
app.post('/movies', (req, res) => {
  const { title, director, genre, release_year, rating } = req.body;
  db.run(
    'INSERT INTO movies (title, director, genre, release_year, rating) VALUES (?, ?, ?, ?, ?)',
    [title, director, genre, release_year, rating],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, ...req.body });
    }
  );
});

// PUT /movies/:id
app.put('/movies/:id', (req, res) => {
  const { title, director, genre, release_year, rating } = req.body;
  db.run(
    'UPDATE movies SET title=?, director=?, genre=?, release_year=?, rating=? WHERE id=?',
    [title, director, genre, release_year, rating, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: req.params.id, ...req.body });
    }
  );
});

// DELETE /movies/:id
app.delete('/movies/:id', (req, res) => {
  db.run('DELETE FROM movies WHERE id=?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

app.listen(3001, () => console.log('Server running on port 3001'));