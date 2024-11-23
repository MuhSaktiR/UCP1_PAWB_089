require('dotenv').config();  // Pastikan dotenv hanya dipanggil sekali
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const pupukRoutes = require('./src/routes/pupuk.js');
const bibitRoutes = require('./src/routes/bibit.js');
const path = require('path');

// Koneksi Database (ini bisa dipisah ke file lain untuk struktur yang lebih baik)
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',    // Menggunakan localhost sebagai fallback
  user: process.env.DB_USER || 'root',         // Ganti dengan username Anda
  password: process.env.DB_PASSWORD || '',     // Ganti jika password digunakan
  database: process.env.DB_NAME || 'nama_database', // Ganti dengan nama database
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
    return;
  }
  console.log('Connected to MySQL database!');
});

module.exports = connection;

const app = express();

// Atur lokasi folder views
app.set('views', path.join(__dirname, 'src', 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Routes
app.use('/pupuk', pupukRoutes);
app.use('/bibit', bibitRoutes);

// Home
app.get('/', (req, res) => res.render('index'));

// Server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
