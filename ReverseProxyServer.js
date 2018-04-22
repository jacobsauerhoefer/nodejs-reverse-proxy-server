const httpProxy = require('http-proxy');

class ReverseProxyServer {
    constructor(routes, server) {
        this.routes = routes;
        this.server = httpProxy.createProxyServer();
    }

    handleRequest(req, res) {
        for (var id in this.routes) {
            if (this.routes.hasOwnProperty(id) && this.handleRoute(routes[id], req, res)) {
                return;
            }
        }
        this.error(req, res);
    }

    handleRoute(route, req, res) {
        var url = req.url;
        if (url.indexOf(route.apiRoute) === 0) {
            req.url = url.replace(route.apiRoute, '');
            this.server.web(req, res, { target: route.upstreamUrl });
            return true;
        }
    }

    error(req, res) {
        res.writeHead(502, {'Content-Type': 'text/plain'});
        res.write('Bad Gateway: ' + req.url);
        res.end();
    }
}

module.exports = ReverseProxyServer;