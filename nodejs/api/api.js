const path = require("path");
const fs = require("fs");

const { routes } = require("./routes");

require("../../dotenv");

const http = require("http");

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.end();
    }


    const route = routes.find(
        (r) => (req.url === r.url && req.method === r.method)
    );

    if (!route) {
        res.writeHead(404, "application/json");
        res.end(JSON.stringify({ error: "Not found" }));
        return;
    }

    if (route) { return route.handler(req, res); }

    res.end();
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
