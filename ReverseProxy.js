const util = require('util'),
    figlet = require('figlet'),
    colors = require('colors'),
    http = require('http'),
    parseurl = require('parseurl'),
    httpProxy = require('http-proxy');

const routes = require('./config');
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
    log(" ");
    log(data.white.bold);
    log("v0.0.1.dev".underline.bold);
    log(" ");
});

function returnError(req, res) {
    res.writeHead(502, {'Content-Type': 'text/plain'});
    res.write('Bad Gateway for: ' + req.url);
    res.end();
}

const proxy = httpProxy.createProxyServer();
function handleRoute(route, req, res) {
    var url = req.url;
    var parsedUrl = parseurl(req);
    if (parsedUrl.path.indexOf(route.apiRoute) === 0) {
        req.url = url.replace(route.apiRoute, '');
        proxy.web(req, res, { target: route.upstreamUrl });
        return true;
    }
}

var server = http.createServer(function (req, res) {
    for (id in routes) {
        if (routes.hasOwnProperty(id) && handleRoute(routes[id], req, res)) {
            return;
        }
    }
    returnError(req, res);
});
server.listen(8000);