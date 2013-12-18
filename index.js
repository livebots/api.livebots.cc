var env      = require('./env');
var pkgjson  = require('./package.json');

var restify  = require('restify');

var server = exports.server =
restify.createServer({
  name:        pkgjson.name,
  level:       'info',
  stream:      process.stdout,
  serializers: restify.bunyan.serializers,
});

exports.init = init;

function init(cb) {
  env.init(server, function() {

    /// Listen

    var port = 3000;

    server.listen(port, function() {
      var startLog = {
        port: port,
        version: pkgjson.version,
        log_level: server.log.level()
      };

      startLog[pkgjson.name] = 'OK';
      server.log.info(startLog, 'API Server has started');
      if (cb) cb();
    });
  });
}

if (require.main == module) { init(); }