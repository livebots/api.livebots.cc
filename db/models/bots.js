var mongoose = require('mongoose');

var botSchema = new mongoose.Schema({
  bot_id: {type: String, unique: true},
  bot_name: String,
  bot_key: String,
  bot_state: {type: Boolean, default: false},
  bot_visible: Boolean, // After having the user
  address: String,
  commands: [String], // List of commands available to execute
  livefeedurl: String,
  photourl: String,
  description: String,
});

botSchema.statics.findByBotId = function (botId, cb) {
  this.find({ bot_id: botId }, cb);
};

botSchema.statics.findAll = function (cb) {
  this.find({},cb);
};




var Bot = module.exports = mongoose.model('Bot', botSchema);