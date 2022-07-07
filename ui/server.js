require("../dotenv");
const http = require("http");

const routes = require("./routes");

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader("Access-Control-Allow-Headers", "*");

    if (req.method === "OPTIONS") { return res.end();}

    const route = routes.find(
        (r) => req.url === r.url && req.method === r.method
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
