var restify  = require('restify');
var joi      = require('joi');
var routes   = require('./routes');
var db       = require('./db');

exports.init = init;

function init(server, cb) {

  // joi.settings.allowUnknown = true;

  server.log.level('info');

  server.use(restify.throttle({
    burst: 120,
    rate: 50,
    ip: true
  }));
  server.use(restify.acceptParser(server.acceptable));
  server.use(restify.queryParser());
  server.use(restify.bodyParser());
  server.use(restify.jsonp());
  server.use(restify.gzipResponse());
  
  db();
  routes.init(server);

  cb();
}