const express = require('express');
const db = require('../models');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary');

var app = express();
var upload = multer({dest: './uploads'});



router.get('/photo', function(req, res){
    res.render('views/partials/layout');
});

router.post('/photo', upload.single('myFile'), function(req, res){
    cloudinary.uploader.upload(req.file.path, function(result){
        db.photo.create({
            name: req.body.name,
            description: req.body.description,
            created_at: new Date(),
            userId: req.body.userId,
            url: cloudinary.url(result.public_id)
        }); console.log(result);
              res.redirect('/photo');
    });
  });




router.get('/edit', function (req, res) {
  db.photo.find({image_id: req.params.id}, function (err, posts) {
      if(err) res.send(err);
        // Render edit form
        //with existing post
      res.render('views/edit', {photo: photos[0]});
  });
}, function (req, res) {
    var oldName = req.body.old_id
    var newName = req.body.image_id;
    cloudinary.uploader.rename(oldName, newName,
      function(error, result) {
          if (error) res.send(error);
          db.photos.findOneAndUpdate({image_id: oldName}, 
              Object.assign({}, req.body, {image: result.url}), 
              function (err) {
              if (err) res.send(err);

              res.redirect('/');
          })
      })

}),

router.delete('photo/:id', function (req, res) {
  var photoId = req.body.photo_Id;
  cloudinary.uploader.destroy(photoId, function (result) {
          Model.findOneAndRemove({ photo_Id: photoId }, function(err) {
              if (err) res.send(err);
              res.redirect('/profile');
          });
      });
});


 module.exports = router;