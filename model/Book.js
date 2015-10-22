var mongoose = require('mongoose');


var BookSchema = new mongoose.Schema({
  title: {required: true, type: String},
  desc: {required: true, type: String},
  addedBy: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  genre: String,
  author: String,
  img: String,
  tags: String,
  deleted: Date,
  reviews: [{
    // review: {}
      // type:String,
      reviewer: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
      comment:String,
      rating: Number,
      postedOn: Date,
    // },
  }],
});

mongoose.model('Book', BookSchema);
