var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var User = mongoose.model('User');
var Book =  mongoose.model('Book');
var passport = require('passport');


router.post('/register', function(req, res, next) {
  var user = new User(req.body);
  user.setPassword(req.body.password);
  user.save(function(err, result) {
    if(err) return next(err);
    if(!result) return next("There was an issue registering that user.");
    res.send(result.createToken());
  });
});


// router.param('id', function(req,res,next,id){
//   User.findOne({_id:id}, function(err,result){
//     if(err) return next(err);
//     if(!result) return next({err: "couldnt find it"});
//     req.user = result;
//     next();
//   });
// });

router.get('/profile/:id', function(req,res,next){
  Book
  .find({addedBy: req.params.id})
  //.select('addedBy')
  .populate('addedBy', 'username')
  .exec(function(err,result){
    if(err) return next(err);
    res.send(result);
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err,user){
    if(err) return next(err);
    res.send(user.createToken());
  })(req,res,next);
  // var username = req.body.username.toLowerCase();
  // User.findOne({username: username}, function(err, user) {
  //   if(err) return next(err);
  //   if(!user) return next("User " + req.body.username + " does not exist in the database");
  //   var correctPassword = user.checkPassword(req.body.password);
  //   if(!correctPassword) return next("Incorrect username and password combination.");
  //   res.send(user.createToken());
  // });
});

module.exports = router;
