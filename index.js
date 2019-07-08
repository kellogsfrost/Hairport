require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
// Module allows the use of sessions
const session = require('express-session');
// Imports passport local strategy
const passport = require('./config/passportConfig');
// module for flash message
const multer = require('multer');
const cloudinary = require('cloudinary');
const flash = require('connect-flash');
const isLoggedIn = require('./middleware/isLoggedIn');
const helmet = require('helmet');

// This is only used by the session store
const db = require('./models');
const upload = multer({dest: './uploads'});
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

app.post('/profile', upload.single('myFile'), function(req, res){
  cloudinary.uploader.upload(req.file.path, function(result){
    //console.log(result)
    //var imgUrl = cloudinary.url(result.public_id);
    //res.render('profile');
    //{url: imgUrl});
    // uploading put not displaying on page
    db.photo.create({
      name: req.body.name,
      description: req.body.description
  }).then(function(post){
      res.redirect('/profile');
    });
  });
});

// this works routed version does not



// ./routes.js
// Truncated for brevity
app.post('/edit', controller.edit);
// Handle submitted updates
app.post('/update', controller.update);

// ./app/controller.js
// Truncated for brevity
  /***
  * Edit action method
  ***/
 edit: function (req, res) {
  Model.find({image_id: req.params.id}, function (err, posts) {
      if(err) res.send(err);
        // Render edit form
        //with existing post
      res.render('pages/edit', {post: posts[0]});
  });
},
/***
* Update action method
***/
update: function (req, res) {
  var oldName = req.body.old_id
  var newName = req.body.image_id;
  cloudinary.v2.uploader.rename(oldName, newName,
      function(error, result) {
          if (error) res.send(error);
          Model.findOneAndUpdate({image_id: oldName}, 
              Object.assign({}, req.body, {image: result.url}), 
              function (err) {
              if (err) res.send(err);

              res.redirect('/');
          })
      })

},

// ./app/controller.js
// Truncated for brevity
destroy: function (req, res) {
  var imageId = req.body.image_id;
  // The destroy method takes the image ID
  // which we need to remove
  cloudinary.v2.uploader.destroy(imageId, function (result) {
          // We also delete this
          // image details from our database
          Model.findOneAndRemove({ image_id: imageId }, function(err) {
              if (err) res.send(err);

              res.redirect('/');
          });
      });
}

app.post('/destroy', controller.destroy);


app.use('/auth', require('./controllers/auth'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
