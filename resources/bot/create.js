var joi            = require('joi');
var async          = require('async');
var restify        = require('restify');
var Bot            = require('./../../db/models/bots.js');
var uuid           = require('./../../lib/uuid');

exports = module.exports = create;
exports.validate = validate;

/// validate

function validate(req, res, next) {
  console.log(req.params)
  var err = joi.validate(req.params, schema);
  if (err) res.send(new restify.InvalidArgumentError(err.message));
  else next();
}

var schema = {
  id: joi.string().required(),
  name: joi.string().required(),
  commands: joi.array().includes(joi.string()),
  address: joi.string(),
  description: joi.string(),
  photoURL: joi.string(),
  liveFeedURL: joi.string(),
  visible: joi.boolean()
};

/// create bot

function create(req, res, next) {

  var bot = {}

  async.series([
      createBot,
      saveBot,
    ], done);

  function createBot(cb) {
    bot.id = req.params.id;
    bot.name = req.params.name;
    bot.key = uuid();
    bot.state = false;
    bot.visible = req.params.visible || true;
    if (req.params.address) bot.address = req.params.address;
    if (req.params.commands) bot.commands = req.params.commands;
    if (req.params.description) bot.description = req.params.description;
    if (req.params.photoURL) bot.photoURL = req.params.photoURL;
    if (req.params.liveFeedURL) bot.liveFeedURL = req.params.liveFeedURL;

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