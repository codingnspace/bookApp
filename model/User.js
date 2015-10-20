var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  username: {required:true, unique: true, type: String, lowercase: true, trim: true},
  email: {required: true, unique: true, type: String, lowercase:true, tim: true},
  passwordHash: String,
  salt: String,
  joined: Date,
  favs: Array,
  added: Array,
  pic: {required: true, type: String},
});


mongoose.model('User', UserSchema);
