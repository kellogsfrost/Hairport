
const express = require('express');
const db = require('../models');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary');
const upload = multer({dest: './uploads'});



router.get('/photo/:id/edit', function(req,res){
    db.photo.findByPk(parseInt(req.params.id))
      .then(function(result){
          res.render('/edit', {photo: result});
    });
  });



  module.exports = router;