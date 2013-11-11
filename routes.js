var restify     = require('restify');
var bot         = require('./resources/bot');

exports.init = init;

function init(server) {

  /// user



  /// auth



  /// bot - for app

  server.post('/bot/:bot_id/last',
    bot.lastCommand.validate,
    bot.lastCommand);

  server.post('/bot/:bot_id/command',
    bot.issueCommand.validate,
    bot.issueCommand);

  server.get('/bots',
    bot.list);

  server.post('/bot',
    bot.create.validate,
    bot.create);

  server.get('/bot/:bot_id',
    bot.get.validate,
    bot.get);

  server.post('/bot/:bot_id',
    bot.edit);

  // server.get('/bot/:bot_id/state',
  //   bot.state);
  /// bot - for module

  //server.get('/bot/:bot_id/command',
  //  bot.issuedCommands);

  // server.post('/bot/:bot_id/state',
  //   bot.updateState);

}