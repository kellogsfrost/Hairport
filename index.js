require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
// Module allows the use of sessions
const session = require('express-session');
// Imports passport local strategy
const passport = require('./config/passportConfig');
// module for flash message
const flash = require('connect-flash');
const isLoggedIn = require('./middleware/isLoggedIn');
const helmet = require('helmet');

const multer = require('multer');
const cloudinary = require('cloudinary');
var upload = multer({dest: './uploads'});


// This is only used by the session store
const db = require('./models');
const app = express();

//This line makes the session use sequelize to write session data to a postgres table
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sessionStore = new SequelizeStore({
  db: db.sequelize,
  expiration: 1000 * 60 * 30
})

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(ejsLayouts);
app.use(helmet());

// Configures express-session middleware

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false, 
  saveUninitialized: true,
  store: sessionStore
}));

// Use this line once to set up the store table
sessionStore.sync();
// Starts the flash middleware
app.use(flash());

// Link passport to the express session
//MUST BE BELOW SESSION
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile');
});

app.get('/new', function(req, res){
  res.render('new');
});


app.post('/photo', upload.single('myFile'), function(req, res){
  cloudinary.uploader.upload(req.file.path, function(result){

      db.photo.create({
          name: req.body.name,
          description: req.body.description,
          created_at: new Date(),
          userId: req.body.userId,
          url: cloudinary.url(result.public_id)
  }); console.log(result);
  // photo.save(function (err) {
  //     if(err){
  //         res.send(err)
  //     }
      res.redirect('/');
  });
  });
//});

//app.use('profile', require('./controllers/profile'))
app.use('/photo', require('./controllers/photo'));
app.use('/auth', require('./controllers/auth'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
