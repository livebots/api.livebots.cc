var mongoose = require('mongoose');
var keys     = require('./../secrets.json');
var mongo_url;

// BEFORE DEPLOY MAKE SURE YOU ARE USING THE REMOTE DB
mongo_url = process.env.MONGOURL
// mongo_url = 'mongodb://' + keys.mongo_user + ':' + keys.mongo_password + '@' + keys.mongo_url + ':' + keys.mongo_port + '/livebots';
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