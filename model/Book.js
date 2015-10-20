var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var BookSchema = new mongoose.Schema({
  title: {required: true, type: String},
  desc: {required: true, type: String},
  genre: String,
  img: String,
  tags: Array,
  deleted: Date,
});

mongoose.model('Book', BookSchema);
