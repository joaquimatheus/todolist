const path = require("path");
const fs = require("fs");

function getUiFiles(name) {
    return fs.readFileSync(path.resolve(__dirname, `./public/${name}`));
}

const htmls = {
    index: getUiFiles("index.html"),
    signup: getUiFiles("signup.html"),
    login: getUiFiles("login.html"),
};

const js = {
    signup: getUiFiles('js/signup.js'),
    login: getUiFiles('js/login.js')
}

const routes = [
    //HTML
    {
        url: '/',
        method: 'GET',
        handler: (req, res) => {
            res.writeHead(200, 'text/html');
            res.end(htmls.index);
        }
    },
    {
        url: "/signup",
        method: "GET",
        handler: (req, res) => {
            res.writeHead(200, "text/html");
            res.end(htmls.signup);
        },
    },
    {
        url: "/login",
        method: "GET",
        handler: (req, res) => {
            res.writeHead(200, "text/html");
            res.end(htmls.login);
        },
    },
    // JS
    {
        url: "/js/signup.js",
        method: 'GET',
        handler: (req, res) => {
            res.writeHead(200, "application/javascript");
            res.end(js.signup);
        }
    },
    {
        url: "/js/login.js",
        method: 'GET',
        handler: (req, res) => {
            res.writeHead(200, "application/javascript");
            res.end(js.login);
        }
    },
];

module.exports = routes;
