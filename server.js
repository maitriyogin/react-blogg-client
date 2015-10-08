// this is run by heroku and serves the built artifacts in the dist directory
var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var http = require('http');

var proxy = httpProxy.createProxyServer({
  changeOrigin: true,
  ws: true
});

var app = express();
var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3002;

var publicPath = isProduction ? path.resolve(__dirname, 'dist') : path.resolve(__dirname, 'build');
app.use(express.static(publicPath));

if(isProduction){
  // Production means heroku or a plain server .. not a http server ..
  // here we're just starting a basic express server to serve the
  // built assets of the project, which will end up in dist.

  app.listen(port, function () {
    console.log('Server running on port ' + port);
  });
} else {
  // we're running on the local webpack dev server
  // although we'll start an express server and give you the option ...
  // to create your own rest api or even socket.io
  var devServer = require('./devServer.js');
  devServer();

  // express server
  // define your rest api
  app.get('/api/post', function (req, res) {
    res.send([{_id:1, body:'post test'}]);
  });

  // serve content from the webpack dev server on /build/*
  // the reason for this is so that we can differ the express server from the dev server.
  app.all('/build/*', function (req, res) {
    proxy.web(req, res, {
      target: 'http://127.0.0.1:3001'
    });
  });

  app.all('/socket.io*', function (req, res) {
    proxy.web(req, res, {
      target: 'http://127.0.0.1:3001'
    });
  });

  proxy.on('error', function(e) {
    // Just catch it
    console.error(e);
  });

  // We need to use basic HTTP service to proxy
  // websocket requests from webpack
  var server = http.createServer(app);

  server.on('upgrade', function (req, socket, head) {
    proxy.ws(req, socket, head);
  });

  server.listen(port, function () {
    console.log('Server running on port ' + port);
  });
}
