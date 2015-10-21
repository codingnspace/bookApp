var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  username: {required:true, unique: true, type: String, lowercase: true, trim: true},
  email: {required: true, unique: true, type: String, lowercase:true, tim: true},
  passwordHash: String,
  salt: String,
  books: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}],
  // joined: Date,
  // favs: Array,
  // added: Array,
  // pic: {required: true, type: String},
});

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.checkPassword = function(password){
  var passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000,64).toString('hex');
  return (passwordHash === this.passwordHash);
};

UserSchema.methods.createToken = function(){
  return jwt.sign({
    _id: this._id,
    username: this.username,
    role: "Default User"
  }, "PumkinEmpanada");
};

mongoose.model('User', UserSchema);
