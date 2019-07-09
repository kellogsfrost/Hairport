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
            userId: req.body.userId,
            url: cloudinary.url(result.public_id)
        }); 
        console.log(result);
              res.redirect('/photo');
    });
  });



router.get('photo/:id/edit', function (req, res) {
  db.photo.find({image_id: req.params.id}, function (err, photos) {
      res.render('views/edit', {photo: photos[0]});
  });
}), router.put('/photo/:id', function (req, res) {
    db.photo.update({  
        name: req.body.name,
        description: req.body.description
    },{
        where: {id: parseInt(req.params.id)}
    }).then(function(req, res){
        res.redirect('/photo/'+ req.params.id);
    });
}),
router.delete('photo/:id', function (req, res) {
  var photoId = req.body.photo_Id;
  cloudinary.uploader.destroy(photoId, function (result) {
    db.dinosaur.destroy({
          where: ({ photo_Id: photoId })
        }).then(function(data){
          (res.redirect('/profile'))
      });
    });
});

 module.exports = router;