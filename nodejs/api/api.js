const path = require("path");
const fs = require("fs");

const { routes } = require("./routes");

require("../../dotenv");

const http = require("http");

const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );

    if (req.method === "OPTIONS") {
        return res.end();
    }

    const route = routes.find(
        (r) => req.url === r.url && req.method === r.method
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
        console.log(ex);

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
        console.log(`server is running =) in ${process.env.API_PORT} `);
    }
);
