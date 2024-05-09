var express = require('express');
var http = require('http')
const app = require('./app');
var server = http.Server(app);
server.listen(4001, () => console.log('listening on *:4001'));
