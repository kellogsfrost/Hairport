
const express = require('express');
const db = require('../models');
const router = express.Router();





router.get('/:id/edit', function(req,res){
    console.log('hitting this route')
    db.photo.findByPk(parseInt(req.params.id))
      .then(function(photo){
          console.log(photo)
          res.render('/edit', {photo});
    });
  });

router.put('/:id', function (req, res) {
    db.photo.update({  
        name: req.body.name,
        description: req.body.description
    },{
        where: {id: parseInt(req.params.id)}
    }).then(function(req, res){
        res.redirect('/photo');
    });
})



  module.exports = router;