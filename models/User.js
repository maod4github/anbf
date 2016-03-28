var mongoose = require('mongoose');
var Encryptor = require('../utils/Encryptor.js');

var schema = new mongoose.Schema({
  mobileNo: { type: String, unique: true, default: '' },
  signinPwd: { type: String, default: '' },
  insertAt: { type: Date, default: Date.now() },
  updateAt: { type: Date, default: Date.now() }
});

schema.pre('save', function (next) {
  var now = Date.now();
  if (this.isNew) {
    this.signinPwd = Encryptor.strong(this.signinPwd);
    this.insertAt = now;
  }
  this.updateAt = now;
  next();
});

schema.pre('find', function (next) {
  if (this._conditions.signinPwd) {
    this._conditions.signinPwd = Encryptor.strong(this._conditions.signinPwd);
  }
  next();
});

schema.pre('findOne', function (next) {
  if (this._conditions.signinPwd) {
    this._conditions.signinPwd = Encryptor.strong(this._conditions.signinPwd);
  }
  next();
});

/*schema.methods = {};*/

/*schema.statics = {
  findAll: function (cb) {
    this.find({}).sort('updateAt').exec(cb);
  },
  findById: function (id, cb) {
    this.findOne({ _id: id }).exec(cb);
  }
};*/

module.exports = mongoose.model('User', schema);
