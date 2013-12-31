var joi            = require('joi');
var async          = require('async');
var restify        = require('restify');
var Bot            = require('./../../db/models/bots.js');

exports = module.exports = get;
exports.validate = validate;

/// validate

function validate(req, res, next) {
  var err = joi.validate(req.params, schema);
  if (err) res.send(new restify.InvalidArgumentError(err.message));
  else next();
}

var schema = {
  id: joi.string().required(),
};

/// get bot

function get(req, res, next) {

  var botId = req.params.id;
  var bot   = {};

  async.series([
      getBot,
    ], done);

  function getBot(cb) {
    Bot.findByBotId(botId, gotBot);

    function gotBot(err, result) {
      if (err) cb(err);
      if (result.length > 0) {
        if (result[0].id) bot.id = result[0].id;
        if (result[0].name) bot.name = result[0].name;
        if (result[0].key) bot.key = result[0].key;
        if (result[0].state) bot.state = result[0].state;
        if (result[0].address) bot.address = result[0].address;
        if (result[0].commands) bot.commands = result[0].commands;
        if (result[0].liveFeedURL) bot.liveFeedURL = result[0].liveFeedURL;
        if (result[0].photoURL) bot.photoURL = result[0].photoURL;
        if (result[0].description) bot.description = result[0].description;      
        cb();
      } else {
        cb(restify.InvalidArgumentError('Not bot with the ID: ', botId));        
      }
    }
  }

  function done(err) {
    if (err) {
      res.send(new restify.InvalidArgumentError(err.detail));
    } else res.send(bot);
  }
}