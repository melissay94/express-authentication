require('dotenv').config();

const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const session = require("express-session");
const passport = require("./config/ppConfig");

const authController =  require('./controllers/auth');

const app = express();

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(ejsLayouts);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize()); // Has to be after the session use 
app.use(passport.session());

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/profile', function(req, res) {
  res.render('profile');
});

app.use('/auth', authController);

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
