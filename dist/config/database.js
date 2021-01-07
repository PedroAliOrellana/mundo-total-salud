"use strict";

var _this = void 0;

var mongoose = require('mongoose');

var dbName = 'total_salud_api';
mongoose.Promise = global.Promise;
module.exports = {
  connect: function connect() {
    return mongoose.connect('mongodb://localhost/' + dbName, {
      useMongoClient: true
    });
  },
  dbName: dbName,
  connection: function connection() {
    if (mongose.connection) return mongoose.connection;
    return _this.connect();
  }
};