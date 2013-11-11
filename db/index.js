var mongoose = require('mongoose');
var mongo_url = process.env.MONGOHQ_URL || 'mongodb://localhost/livebots_dev';

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