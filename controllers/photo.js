const express = require('express');
const db = require('../models');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary');

var app = express();
var upload = multer({dest: './uploads'});




// // ./app/controller.js
// // Truncated for brevity
//   /***
//   * Edit action method
//   ***/
//  edit: function (req, res) {
//   Model.find({image_id: req.params.id}, function (err, posts) {
//       if(err) res.send(err);
//         // Render edit form
//         //with existing post
//       res.render('pages/edit', {post: posts[0]});
//   });
// },
// /***
// * Update action method
// ***/
// update: function (req, res) {
//   var oldName = req.body.old_id
//   var newName = req.body.image_id;
//   cloudinary.v2.uploader.rename(oldName, newName,
//       function(error, result) {
//           if (error) res.send(error);
//           Model.findOneAndUpdate({image_id: oldName}, 
//               Object.assign({}, req.body, {image: result.url}), 
//               function (err) {
//               if (err) res.send(err);

//               res.redirect('/');
//           })
//       })

// },

// // ./app/controller.js
// // Truncated for brevity
// destroy: function (req, res) {
//   var imageId = req.body.image_id;
//   // The destroy method takes the image ID
//   // which we need to remove
//   cloudinary.v2.uploader.destroy(imageId, function (result) {
//           // We also delete this
//           // image details from our database
//           Model.findOneAndRemove({ image_id: imageId }, function(err) {
//               if (err) res.send(err);

//               res.redirect('/');
//           });
//       });
// }


 module.exports = router;