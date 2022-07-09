require("../dotenv");

const http = require("http");
const routes = require("./routes");
const urlModule = require('url');
const queryString = require('querystring')

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader("Access-Control-Allow-Headers", "*");

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
        console.log(`Server is running in ${process.env.HTTP_PORT_SERVER}`);
    }
);
