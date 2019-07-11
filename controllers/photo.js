const express = require('express');
const db = require('../models');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary');
const upload = multer({dest: './uploads'});



router.get('/', function(req, res){
  console.log("hello photos");
  db.photo.findAll().then( function(photos){
    console.log(photos)
    res.render('photo.ejs', {photos});
  })
});

router.post('/', upload.single('myFile'), function(req, res){
    cloudinary.uploader.upload(req.file.path, function(result){
      var imgUrl = cloudinary.url(result.public_id);
        db.photo.create({
            name: req.body.name,
            description: req.body.description,
            userId: req.body.userId,
            publicId: req.file.public_Id,
            url: cloudinary.url(result.public_id)
        }); 
        console.log(result);
              res.redirect('/profile');
    });
  });

  router.get('/:id/edit', function(req,res){
    console.log('hitting this route')
    db.photo.findByPk(parseInt(req.params.id))
      .then(function(photo){
          console.log(photo)
          res.render('edit', {photo});
    });
  });

router.put('/:id', function (req, res) {
    db.photo.update({  
        name: req.body.name,
        description: req.body.description
    },{
        where: {id: parseInt(req.params.id)}
    }).then(function(){
        res.redirect('/photo');
    });
})


router.delete('/:id', function (req, res) {
  console.log("hello")
    db.photo.destroy({
          where: { id: parseInt(req.params.id)}
        }).then(function(result){
          res.redirect('/profile')
      });
    });

 module.exports = router;