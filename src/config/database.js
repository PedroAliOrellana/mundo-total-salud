const mongoose = require('mongoose');

const dbName = 'total_salud_api';

mongoose.Promise = global.Promise;
module.exports = {
  connect: ()=> mongoose.connect('mongodb://localhost/'+dbName,{
    useMongoClient: true
  }),
  dbName,
  connection: ()=>{
    if(mongose.connection)
      return mongoose.connection;
    return this.connect();
  }
}
