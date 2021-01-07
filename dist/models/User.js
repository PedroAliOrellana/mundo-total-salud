"use strict";

var mongoose = require('mongoose');

var mongooseBcrypt = require('mongoose-bcrypt');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  id_rol: String,
  fecha_creacion: {
    type: Date,
    "default": Date.now()
  },
  fecha_actualizacion: {
    type: Date,
    "default": Date.now()
  },
  ultima_sesion: {
    type: Date,
    "default": Date.now()
  },
  token: String,
  estatus: {
    type: Number,
    "default": 1
  }
});
userSchema.post('save', function (user, next) {
  User.count({}).then(function (count) {
    if (count == 1) {
      // user.admin = true;
      // user.save().then(next);
      User.update({
        '_id': user._id
      }, {
        admin: true
      }).then(function (result) {
        next();
      });
    } else {
      next();
    }
  });
});
userSchema.plugin(mongooseBcrypt);
var User = mongoose.model('User', userSchema);
module.exports = User;