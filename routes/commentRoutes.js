var express = require('express');
// var Comment = require('../models/CommentModel');
var router = express.Router();

//modular route handler for comment id- necessary?

//get all comments- WORKS
router.get('/', function(req, res, next) {
  Comment.find(function(error, comments) {
    if (error) {
      console.error(error)
      return next(error);
    } else {
      res.send(comments);
    }
  });
});

//get 1 comment
router.get('/:commentid', function(req,res,next){
  res.send(req.comment);
})

//add comment (to post) - ?
router.post('/:postid', function(req,res,next){
	console.log(req.post);
  // Comment.create(req.body, function(err, comment) {
  //   if (err) {
  //     console.error(err)
  //     return next(err);
  //   } else {
  //     req.post.update({$push:{'comments':comment}}, function(err,result){
  //       if (err) {
  //         return next(err);
  //       } else {
  //         return res.send(result);
  //       }
  //     })
  //   }
  // })
})

module.exports = router;