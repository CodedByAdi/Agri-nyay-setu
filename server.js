// server.js
const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to SQLite database
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    // Create tables if they don't exist
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      phone TEXT,
      user_type TEXT NOT NULL,
      ration_card TEXT,
      gstin TEXT,
      address TEXT
    )`);
    
    db.run(`CREATE TABLE IF NOT EXISTS ngos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT,
      topics TEXT,
      location TEXT,
      contact TEXT
    )`);
  }
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.post('/api/register', (req, res) => {
  const { name, email, password, phone, userType, rationCard, gstin, address } = req.body;
  
  // Basic validation
  if (!name || !email || !password || !userType) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const sql = `INSERT INTO users (name, email, password, phone, user_type, ration_card, gstin, address)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  
  db.run(sql, [name, email, password, phone, userType, rationCard, gstin, address], function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ id: this.lastID, message: 'Registration successful' });
  });
});

// More routes for login, NGO filtering, etc.

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});