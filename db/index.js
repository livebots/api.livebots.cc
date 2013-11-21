var mongoose = require('mongoose');
var keys     = require('keys');
var mongo_url;

// BEFORE DEPLOY MAKE SURE YOU ARE USING THE REMOTE DB
mongo_url = 'mongodb://' + keys.mongo_user + ':' + 'keys.mongo_password' + "@SOMEURL:PORT/livebots"
// mongo_url = 'mongodb://localhost/livebots_dev';

require('./models/bots');
require('./models/commands');

module.exports = function() {
  mongoose.connect(mongo_url);
  var db = mongoose.connection;
  
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function (){
    console.log('Successfuly connected to mongoDB');
  });
};