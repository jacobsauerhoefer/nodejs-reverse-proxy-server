#ReverseProxy
![alt text](https://dzwonsemrish7.cloudfront.net/items/2x0e3Z0G160o3F3D3V42/Image%202018-04-22%20at%202.57.55%20PM.png?v=2a4aba67)
Inspired by: https://memz.co/api-gateway-microservices-docker-node-js/

## Description

Standalone Reverse Proxy Server with support for multiple routes using http-proxy. Define routes from multiple services in a configuration file and access them from a single endpoint.

## Installation & Usage

```bash
#Install Node Modules from package.json
npm i

#Start Server
npm start
```

## Configuration
Define routes in a `config.js` file using the following format:
```
module.exports = routes = {
    'user': {
        apiRoute: '/api/user',
        upstreamUrl: '127.0.0.1:3000'
    },
    'books': {
        apiRoute: '/api/books',
        upstreamUrl: '127.0.0.1:3001'
    }
}
```

### Class: ReverseProxyServer