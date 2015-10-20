var mongoose = require('mongoose');


var BookSchema = new mongoose.Schema({
  title: {required: true, type: String},
  desc: {required: true, type: String},
  genre: String,
  author: String,
  img: String,
  tags: String,
  deleted: Date,
});

mongoose.model('Book', BookSchema);
