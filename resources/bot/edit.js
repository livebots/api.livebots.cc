var joi            = require('joi');
var async          = require('async');
var restify        = require('restify');
var Bot            = require('./../../db/models/bots.js');
var assert         = require('assert');

exports = module.exports = edit;
exports.validate = validate;

/// validate

function validate(req, res, next) {
  var err = joi.validate(req.params, schema);
  if (err) res.send(new restify.InvalidArgumentError(err.message));
  else next();
}

var schema = {
  current_id: joi.string().required(),
  id: joi.string(),
  name: joi.string(),
  commands: joi.array().includes(joi.string()),
  address: joi.string(),
  description: joi.string(),
  photoURL: joi.string(),
  liveFeedURL: joi.string(),
  visible: joi.boolean()
};

/// create bot

function edit(req, res, next) {
  var currentBotId = req.params.current_id;
  assert(currentBotId, 'must have the current bot ID');

  var bot;

  async.series([
      getBot,
      editBot,
      saveBot
    ], done);

  function getBot(cb) {
    Bot.findByBotId(currentBotId, gotBot);

    function gotBot(err, result) {
      if (err) cb(err);
      bot = result[0];
      cb();
    }
  }

  function editBot(cb) {

    if (req.params.id) bot.id = req.params.id;
    if (req.params.name) bot.name = req.params.name;
    if (req.params.key) bot.key = req.params.key;
    if (req.params.state !== null) bot.state = req.params.state;
    if (req.params.address) bot.address = req.params.address;
    if (req.params.commands) bot.commands = req.params.commands;
    if (req.params.liveFeedURL) bot.liveFeedURL = req.params.liveFeedURL;
    if (req.params.photoURL) bot.photoURL = req.params.photoURL;
    if (req.params.description) bot.description = req.params.description;
    cb();
  }

  function saveBot(cb) {
    bot.save(function (err, res){
      if (err) cb(err);
      console.log('bot edited sucessfuly', res);
      cb();
    });
  }

  function done(err) {
    if (err) {
      res.send(new restify.InvalidArgumentError(err.detail));
    } else res.send(bot);
  }
}