var express = require('express');
var User = require('../models/UserModel');
var router = express.Router();

//modular route handler for user id
router.param('userid', function(req, res, next, id) {
  User.findById(id, function(err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      return next(new Error('User does not exist'));
    } else {
      req.user = user;  //put the post on the request object for the next function in line to use
      return next();
    }
  });
});

//get all users- WORKING
router.get('/', function(req, res, next) {
  User.find(function(error, users) {
    if (error) {
      console.error(error)
      return next(error);
    } else {
      res.send(users);
    }
  });
});

module.exports = router;