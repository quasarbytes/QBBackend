var express = require('express');
var http = require('http')
var https = require('https')
const app = require('./app');
const fs = require('fs');

const options = {
    // /home/ubuntu/QuasarBytesBackend
    // key:fs.readFileSync('/home/ubuntu/QuasarBytesBackend/key.pem'),
    // cert:fs.readFileSync('/home/ubuntu/QuasarBytesBackend/cert.pem')
    key:fs.readFileSync('/home/ubuntu/ssl/private.key'),
    cert:fs.readFileSync('/home/ubuntu/ssl/certificate.crt'),
    bundle:fs.readFileSync('/home/ubuntu/ssl/ca_bundle.crt'),

}
// var server = http.Server(app);
const server = https.createServer(options, app);
server.listen(4001, () => console.log('listening on *:4001'));
