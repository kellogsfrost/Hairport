const express = require('express');
const db  = require('../models');
const passport = require('../config/passportConfig');
const router = express.Router();



router.post('/profile', upload.single('myFile'), function(req, res){
    cloudinary.uploader.upload(req.file.path, function(result){
      console.log(result)
      //var imgUrl = cloudinary.url(result.public_id);
      res.render('profile');
      //{url: imgUrl});
      // uploading put not displaying on page
    });
  });


  module.exports = router;
