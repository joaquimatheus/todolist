const path = require("path");
const fs = require("fs");

function getUiFiles(name) {
    return fs.readFileSync(path.resolve(__dirname, `./public/${name}`));
}

const htmls = {
    index: getUiFiles("index.html"),
    signup: getUiFiles("signup.html"),
    login: getUiFiles("login.html"),
    tasks: getUiFiles('tasks.html'),
    forget: getUiFiles('forget.html'),
    recover: getUiFiles('recover.html')
};

const js = {
    signup: getUiFiles('js/signup.js'),
    login: getUiFiles('js/login.js'),
    forget: getUiFiles('js/forget.js'),
    recover: getUiFiles('js/recover.js')
}

const css = {
    home: getUiFiles('css/home.css'),
    form: getUiFiles('css/formPage.css'),
    tasks: getUiFiles('css/tasks.css')
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
        url: '/tasks',
        method: 'GET',
        handler: (req, res) => {
            res.writeHead(200, 'text/html');
            res.end(htmls.tasks);
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
    {
        url: '/forget',
        method: 'GET',
        handler: (req, res) => {
            res.writeHead(200, 'text/html');
            res.end(htmls.forget);
        }
    },
    {
        url: '/recover',
        method: 'GET',
        handler: (req, res) => {
            res.writeHead(200, 'text/html');
            res.end(htmls.recover);
        }
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
    {
        url: '/js/forget.js',
        method: 'GET',
        handler: (req, res) => {
            res.writeHead(200, 'application/javascript');
            res.end(js.forget);
        }
    },
    {
        url: '/js/recover.js',
        method: 'GET',
        handler: (req, res) => {
            res.writeHead(200, 'application/javascript');
            res.end(js.recover);
        }
    },
    // CSS
    {
        url: '/css/home.css',
        method: 'GET',
        handler: (req, res) => {
            res.writeHead(200, 'text/css');
            res.end(css.home);
        }
    },
    {
        url: '/css/form.css',
        method: 'GET',
        handler: (req, res) => {
            res.writeHead(200, 'text/css');
            res.end(css.form);
        }
    },
    {
        url: '/css/tasks.css',
        method: 'GET',
        handler: (req, res) => {
            res.writeHead(200, 'text/css');
            res.end(css.tasks);
        }
    }
];

module.exports = routes;
