require("../dotenv");

const http = require("http");
const routes = require("./routes");
const urlModule = require('url');
const queryString = require('querystring');
const Logger = require('../shared/logger'); 

const logger = new Logger();

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader("Access-Control-Allow-Headers", "*");

    const ip = req.connection.remoteAddress;
    logger.info(`${ip} - Start request: ${req.method}: ${req.url}`)

    const started = new Date();
    res.on('finish', () => {
        const took = new Date() - started;

        logger.info(
            `${ip} - Request done: ${req.method}: ` +
            `${req.url} ${res.statusCode} ${took}ms`
        );
    });

    if (req.method === "OPTIONS") { return res.end();}

    const { pathname, search } = urlModule.parse(req.url);
    if (search) {
        req.query = queryString.parse(search.slice(1));
    }

    const route = routes.find(
        (r) => pathname === r.url && req.method === r.method
    );

    if (route) { return route.handler(req, res) }

    res.end();
});

server.listen(
    {
        host: "localhost",
        port: process.env.HTTP_PORT_SERVER,
    },
    () => {
        logger.info(`Server is running in ${process.env.HTTP_PORT_SERVER}`);
    }
);
