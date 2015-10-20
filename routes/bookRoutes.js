var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Book = mongoose.model('Book');

router.post('/', function(req, res, next) {
    var book = new Book(req.body);
    book.deleted = null;
    book.save(function(err, result) {
      if(err) return next(err);
      if(!result) return next("Could not create the object. Please check all fields.");
      res.send(result);
    });
});

router.get('/', function(req,res,next){
  Book
  .find({},function(err,result){
    if(err) return next(err);
    res.send(result);
  });
});

module.exports = router;
