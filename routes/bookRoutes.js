var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Book = mongoose.model('Book');
var jwt = require('express-jwt');
var auth = jwt({
  secret: "PumkinEmpanada",
  userProperty: 'payload'
});

// Add a new book. user must be logged in
router.post('/', auth, function(req, res, next) {
    var book = new Book(req.body);
    // book.addedBy = req.book._id;
    // book.deleted = null;
    book.save(function(err, result) {
      if(err) return next(err);
      // if(!result) return next("Could not create the object. Please check all fields.");
      // result.addedBy = req.payload.username;
      res.send(result);
    });
});

// router.get('/:id', function(req,res,next){
//   Book
//   .findOne({_id: req.params.id},
//     function(err,result){
//       if(err) return next(err);
//       res.send(req.book);
//
//     });
// });

// Find a particular book, edit and updated book
router.put('/', function(req,res,next){
  Book.update({_id: req.body.IDofBooktoEdit},req.body.EditedBook,
  function(err,result){
  if(err) return next(err);
  if(!result) return next("Could not create the object. Please check all fields.");
  res.send(result);
});
});

//Delete a book by it's id
router.delete('/:id', function(req,res){
  console.log("I made it to the route file");
  Book.remove().exec();
  res.send();
});
//Display all books
router.get('/', function(req,res,next){
  Book
  .find({})
  // .select('title desc genre author img tags addedBy')
  // .populate('addedBy', 'username')
  .exec(function(err,result){
    if(err) return next(err);
    res.send(result);
  });
});

router.param('id', function(req,res,next,id){
  Book.findOne({_id: id}, function(err,result){
    if(err) return next(err);
    if(!result) return next({err: "couldnt find it"});
    req.book = result;
    next();
  });
});



module.exports = router;
