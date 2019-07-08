// const express = require('express');
// const db  = require('../models');
// const multer = require('multer');
// const cloudinary = require('cloudinary');
// const router = express.Router();
// const upload = multer({dest: './uploads'});


// router.post('/photo', upload.single('myFile'), function(req, res){
//     cloudinary.uploader.upload(req.file.path, function(result){
//       console.log(result)
//       //var imgUrl = cloudinary.url(result.public_id);
//       res.render('profile');
//       //{url: imgUrl});
//       // uploading put not displaying on page
//     });
//   });


//   module.exports = router;