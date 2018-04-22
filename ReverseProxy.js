const util = require('util'),
    figlet = require('figlet'),
    colors = require('colors'),
    http = require('http'),
    httpProxy = require('http-proxy');

const routes = require('./config');
const ReverseProxyServer = require('./src/ReverseProxyServer');    
const log = console.log;

figlet.text('REVERSE-PROXY', {
    font: 'Small Slant',
    horizontalLayout: 'default',
    verticalLayout: 'default'
}, function(err, data) {
    if (err) {
        log('Something went wrong...');
        log(err);
        return;
    }
    log("");
    log(data.white.bold);
    log("v1.0.0.alpha".underline.bold);
    log("");
});

const reverseProxyServer = new ReverseProxyServer(routes);
const server = http.createServer((req, res) => reverseProxyServer.handleRequest(req, res));

process.on('uncaughtException', (err) => {
    log(err);
});

server.listen(8000);