const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const flash = require("req-flash");
const app = express();

const pupukRoutes = require('./src/routes/pupuk.js');
const bibitRoutes = require('./src/routes/bibit.js');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',     
  password: process.env.DB_PASSWORD || '', 
  database: process.env.DB_NAME || 'pertanian',
});

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: "t@1k0ch3ng",
  name: "secretName",
  cookie: {
    sameSite: true,
    maxAge: 60000,
  }
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());

app.use(function (req, res, next) {
  res.setHeader(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  res.setHeader("Pragma", "no-cache");
  next();
});

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

app.use('/pupuk', pupukRoutes);
app.use('/bibit', bibitRoutes);

app.get('/', (req, res) => res.render('index'));

app.listen(3000, () => console.log('Server Berjalan di Port : http://localhost:3000'));
