var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Book = mongoose.model('Book');
var jwt = require('express-jwt');
var auth = jwt({
  secret: "PumkinEmpanada",
  userProperty: 'payload'
});

router.post('/', auth, function(req, res, next) {

    var book = new Book(req.body);
    book.addedBy = req.payload._id;
    book.deleted = null;
    book.save(function(err, result) {
      if(err) return next(err);
      if(!result) return next("Could not create the object. Please check all fields.");
      // result.addedBy = req.payload.username;
      res.send(result);
    });
});

router.get('/:id', function(req,res,next){
  Book
  .findOne({_id: req.params.id},
    function(err,result){
      if(err) return next(err);
      res.send(req.book);

    });
});
router.put('/:id', function(req,res,next){
  Book.findOneAndUpdate({_id: req.params.id},req.body,
  function(err,result){
  if(err) return next(err);
  if(!result) return next("Could not create the object. Please check all fields.");
  res.send(result);
});
});

router.get('/', function(req,res,next){
  Book
  .find({})
  .select('title desc genre author img tags addedBy')
  .populate('addedBy', 'username')
  .exec(function(err,result){
    if(err) return next(err);
    res.send(result);
  });
});

router.param('id', function(req,res,next,id){
  Book.findOne({_id:id}, function(err,result){
    if(err) return next(err);
    if(!result) return next({err: "couldnt find it"});
    req.book = result;
    next();
  });
});



module.exports = router;
