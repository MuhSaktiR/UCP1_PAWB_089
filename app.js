require('dotenv').config();
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const pupukRoutes = require('./src/routes/pupuk.js');
const bibitRoutes = require('./src/routes/bibit.js');
const path = require('path');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',     
  password: process.env.DB_PASSWORD || '', 
  database: process.env.DB_NAME || 'nama_database',
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

app.set('views', path.join(__dirname, 'src', 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use('/pupuk', pupukRoutes);
app.use('/bibit', bibitRoutes);

app.get('/', (req, res) => res.render('index'));

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
