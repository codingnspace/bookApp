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

// Add a new book. user must be logged in
router.post('/', auth, function(req, res, next) {
    var book = new Book(req.body);
    // book.addedBy = req.body._id;
    // book.deleted = null;
    book.save(function(err, result) {
      if(err) return next(err);
      if(!result) return next("Could not create the object. Please check all fields.");
      result.addedBy = req.payload.username;
      res.send(result);
    });
});

router.post('/:id/review', auth, function(req,res,next){
  console.log(req.body);
  var review = {
    reviewer: req.payload.username,
    rating: req.body.reviews.rating,
    comment: req.body.reviews.comment,
    // postedOn: req.body.reviews.postedOn.new Date()
    };
console.log(req.body.reviews.rating , "bookroutes");
// console.log(req.book.reviews);
 req.book.reviews.push(review);
 // console.log(req.book.reviews);

 req.book.save(function(err, result){
   console.log(req.book);
   res.send(req.book);
 });
});

router.get('/:id', function(req,res,next){
  Book
  .findOne({_id: req.params.id},
    function(err,result){
      if(err) return next(err);
      console.log("I made it to the route file. about to send response");
      res.send(req.book);
      console.log("Sent response");
    });
});

// Find a particular book, edit and updated book
router.put('/:id', auth,function(req,res,next){
  // console.log("made it to route file (for edit)");
  Book.update({_id: req.params.id},req.body,
  function(err,result){
    // console.log(req.body + "req.body");
    // console.log(req.params.id + "reqparams.id");
  if(err) return next(err);
  if(!result) return next("Could not create the object. Please check all fields.");
  // console.log(result);
  res.send(result);
});
});

//Delete a book by it's id
router.delete('/:id', function(req,res,next){
  // console.log("I made it to the route file");
  Book.remove({_id: req.params.id}, function(err,result){
    if(err) return next(err);
  res.send();
});
});
//Display all books
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




module.exports = router;
