var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Book = mongoose.model('Book');
var User = mongoose.model('User');

var jwt = require('express-jwt');
var auth = jwt({
  secret: "PumkinEmpanada",
  userProperty: 'payload'
});

router.param('id', function(req,res,next,id){
  // console.log(id);
  Book.findOne({_id: id}, function(err,result){
    if(err) return next(err);
    if(!result) return next({err: "couldnt find it"});
    req.book = result;
    next();
  });
});


router.get('/search/index.xml ',  function(req, res, next) {
    // var book = new Book(req.body);
    // book.addedBy = req.body._id;
    // book.deleted = null;
    // book.save(function(err, result) {
    //   if(err) return next(err);
    //   if(!result) return next("Could not create the object. Please check all fields.");
    //   result.addedBy = req.payload.username;
      res.send(result);
    // });
});

module.exports = router;
