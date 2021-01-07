"use strict";

var cloudinary = require('cloudinary');

var secrets = require('../config/secrets');

cloudinary.config(secrets.cloudinary);

module.exports = function (imagePath) {
  return new Promise(function (resolve, reject) {
    cloudinary.uploader.upload(imagePath, function (result) {
      console.log(result);
      if (result.secure_url) return resolve(result.secure_url);
      reject(new Error('Error with cloudinary'));
    });
  });
};