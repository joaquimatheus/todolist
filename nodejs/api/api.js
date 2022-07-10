require("../../dotenv");

const fs = require("fs");
const path = require("path");
const { routes } = require("./routes");
const urlModule = require('url');
const queryString = require('querystring');
const http = require("http");
const Logger = require('../../shared/logger');
const logger = new Logger()

const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );

    const ip = req.connection.remoteAddress;
    logger.info(`${ip} - Start request: ${req.method}: ${req.url}`)

    const started = new Date();
    res.on('finish', () => {
        const took = new Date() - started;

        logger.info(
            `${ip} - Request done: ${req.method} ` +
            `${req.url} ${res.statusCode} ${took}ms`
        );
    });

    if (req.method === "OPTIONS") {
        return res.end();
    }

    const { pathname, search } = urlModule.parse(req.url);
    if (search) {
        req.query = queryString.parse(search.slice(1));
    }

    const route = routes.find(
        (r) => pathname === r.url && req.method === r.method
    );

    if (!route) {
        res.writeHead(404, "application/json");
        res.end(JSON.stringify({ error: "Not found" }));
        return;
    }

    try {
        if (route.middlewares) {
            await new Promise((resolve, reject) => {
                const middlewares = [...route.middlewares];

                function iterator(err) {
                    if (err) {
                        return reject(err);
                    }

                    middleware = middlewares.shift();
                    if (middleware) {
                        return middleware(req, res, iterator);
                    }

                    resolve();
                }

                iterator();
            });
        }

        await route.handler(req, res);
    } catch (ex) {
        logger.error(ex);

        res.writeHead(500, 'application/json');
        res.end(JSON.stringify({ error: ex.message }))
    }
});

server.listen(
    {
        host: "localhost",
        port: process.env.API_PORT,
    },
    () => {
        logger.info(`server is running =) in ${process.env.API_PORT} `);
    }
);
