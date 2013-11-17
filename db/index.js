var mongoose = require('mongoose');
var keys     = require('keys');

var mongo_url;
if (process.env.NODE_ENV){
  mongo_url = 'mongodb://' + keys.mongo_user + ':' + 'keys.mongo_password' + "@SOMEURL:PORT/livebots"
} else {
  mongo_url = 'mongodb://localhost/livebots_dev';
}


require('./models/bots');
require('./models/commands');

module.exports = function() {
  console.log('CONNECTING TO MONGO');
  mongoose.connect(mongo_url);
  var db = mongoose.connection;
  
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function (){
    console.log('Successfuly connected to mongoDB');
  });
};