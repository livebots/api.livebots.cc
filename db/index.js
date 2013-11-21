var mongoose = require('mongoose');
var mongo_url;

mongo_url = process.env.MONGOURL
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