const express = require('express');
const db = require('./db');
const app = express();
app.use(express.json());

app.get('/todos', (req, res) => {
  db.all('SELECT * FROM todos', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/todos', (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ error: 'Task is required' });
  db.run('INSERT INTO todos (task) VALUES (?)', [task], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, task });
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
