var express = require('express');
var router = express.Router();
var Post = require("../models/postModel");
var Comment = require('../models/commentModel');

// var expressJWT = require('express-jwt');
// var ensureAuthenticated = expressJWT({ secret: 'thisIsTopSecret' });

//modular route handler for post id
router.param('postid', function(req, res, next, id) {
  Post.findById(id, function(err, post) {
    if (err) {
      return next(err);
    } else if (!post) {
      return next(new Error('Post does not exist'));
    } else {
      req.post = post;  //put the post on the request object for the next function in line to use
      return next();
    }
  });
});

//modular route handler for comments
router.param('commentid', function(req, res, next, id) {
  Comment.findById(id, function(err, comment) {
    if (err) {
      return next(err);
    } else if (!comment) {
      return next(new Error('Comment does not exist'));
    } else {
      req.comment = comment;  //put the post on the request object for the next function in line to use
      return next();
    }
  });
});

//add post- WORKING
router.post('/', function(req, res, next) {
  Post.create(req.body, function(err, post) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
      res.json(post);
    }
  });
});

//get all posts- WORKING
router.get('/', function(req, res, next) {
  Post.find(function(error, posts) {
    if (error) {
      console.error(error)
      return next(error);
    } else {
      res.send(posts);
    }
  });
});

//delete a post- WORKING, admin- NO
router.delete('/:postid', function(req, res, next) {
  req.post.remove(function(err, result) {
    if (err) {
      return next(err);
    } else {
      return res.send(result);
    }
  });
});

//up/down vote post- WORKING
router.put('/:postid/update', function(req, res, next) {
  if (req.body.vote == 1){
    voteType = 1;
  } else {
    voteType = -1;
  }
  req.post.update({$inc: {'upvotes': voteType}}, { new: true }, function(err,result) {
    if (err) {
      return next(err);
    } else {
      return res.send(result);
    }
  });
});

//add comment (to post) - WORKING
router.post('/comment/:postid', function(req,res,next){
  Comment.create(req.body, function(err, comment) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
      req.post.update({$push:{'comments':comment}}, function(err,result){
        if (err) {
          return next(err);
        } else {
          return res.send(result);
        }
      })
    }
  })
})

//get post- WORKING, with comments -WORKING
router.get('/:postid', function(req,res,next){
  Post.findById(req.post.id).populate('comments').exec(function(err, result) {
    if (err) {
      console.error(err);
    } else {
      res.send(result);
    }
  })
})

//up/down vote comment (belonging to post) - WORKING
router.put('/comments/:commentid/update', function(req, res, next) {
  if (req.body.vote == 1){
    voteType = 1;
  } else {
    voteType = -1;
  }
  req.comment.update({$inc: {'upvotes': voteType}}, { new: true }, function(err,result) {
    if (err) {
      return next(err);
    } else {
      return res.send(result);
    }
  });
});

//delete a comment - WORKING , admin- NO
router.delete('/comment/:commentid', function(req, res, next) {
  req.comment.remove(function(err, result) {
    if (err) {
      return next(err);
    } else {
      return res.send(result);
    }
  });
});

module.exports = router;