#!/usr/bin/env node

var express = require("express");
var app = express();

var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var path = require('path');
var logger = require('morgan');

var hostname = process.env.HOSTNAME || 'localhost';
var port = parseInt(process.env.PORT, 10) || 8087;

var publicDir = __dirname + '/public';
var dataDir = __dirname + '/data';

app.get("/", function (req, res) {
  res.sendFile(path.join(publicDir, "/index.html"));
});

app.use(logger('dev'));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(publicDir));
app.use(express.static(dataDir));

app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));

console.log("Vtiles-Playground - Playing with vector tiles...");
console.log("Listening at http://%s:%s", hostname, port);
app.listen(port, hostname);
