var joi            = require('joi');
var async          = require('async');
var restify        = require('restify');
var Bot            = require('./../../db/models/bots.js');
var uuid           = require('./../../lib/uuid');

exports = module.exports = create;
exports.validate = validate;

/// validate

function validate(req, res, next) {
  var err = joi.validate(req.params, schema);
  if (err) res.send(new restify.InvalidArgumentError(err.message));
  else next();
}

var schema = {
  bot_id: joi.string().required(),
  bot_name: joi.string().required(),
  commands: joi.array().includes(joi.string()),
  address: joi.string(),
  description: joi.string(),
  photourl: joi.string(),
  livefeedurl: joi.string(),
  bot_visible: joi.boolean()
};

/// create bot

function create(req, res, next) {

  var bot = {}

  async.series([
      createBot,
      saveBot,
    ], done);

  function createBot(cb) {
    bot.bot_id = req.params.bot_id;
    bot.bot_name = req.params.bot_name;
    bot.bot_key = uuid();
    bot.bot_state = false;
    bot.bot_visible = req.params.bot_visible || true;
    if (req.params.address) bot.address = req.params.address;
    if (req.params.commands) bot.commands = req.params.commands;
    if (req.params.description) bot.description = req.params.description;
    if (req.params.photourl) bot.photourl = req.params.photourl;
    if (req.params.livefeedurl) bot.livefeedurl = req.params.livefeedurl;

    cb();
  }

  function saveBot(cb) {
    var newBot = new Bot(bot);

    newBot.save(function (err, res){
      if (err) cb(err);
      console.log('bot saved sucessfuly',res);
      cb();
    })
    
  }

  function done(err) {
    if (err) {
      res.send(new restify.InvalidArgumentError(err.detail));
    } else res.send(bot);   
  }
}