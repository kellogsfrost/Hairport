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
        db.photo.create({
            name: req.body.name,
            description: req.body.description,
            userId: req.body.userId,
            url: cloudinary.url(result.public_id)
        }); 
        console.log(result);
              res.redirect('/profile');
    });
  });


router.get('/photo/:id/edit', function(req,res){
  db.photo.findByPk(parseInt(req.params.id))
    .then(function(result){
        res.render('/edit', {photo: result});
  });
});

// router.get('photo/:id/edit', function (req, res) {
//   db.photo.find({image_id: req.params.id}, function (photos) {
//       res.render('views/edit', {photo: photos[0]});
//   });
// }), router.put('/photo/:id', function (req, res) {
//     db.photo.update({  
//         name: req.body.name,
//         description: req.body.description
//     },{
//         where: {id: parseInt(req.params.id)}
//     }).then(function(req, res){
//         res.redirect('/photo/'+ req.params.id);
//     });
// }),

router.delete('/:id', function (req, res) {
    db.photo.destroy({
          where: { id: parseInt(req.params.id)}
        }).then(function(result){
          res.redirect('/profile')
      });
    });

 module.exports = router;