const path = require("path");
const fs = require("fs");

function getUiFiles(name) {
    return fs.readFileSync(path.resolve(__dirname, `./public/${name}`));
}

const htmls = {
    index: getUiFiles("index.html"),
    about: getUiFiles('about.html'),
    faq: getUiFiles('faq.html'),
    signup: getUiFiles("signup.html"),
    login: getUiFiles("login.html"),
    tasks: getUiFiles('tasks.html'),
    forget: getUiFiles('forget.html'),
    recover: getUiFiles('recover.html'),
    addTask: getUiFiles('addTasks.html')
};

const js = {
    signup: getUiFiles('js/signup.js'),
    login: getUiFiles('js/login.js'),
    forget: getUiFiles('js/forget.js'),
    recover: getUiFiles('js/recover.js'),
    app: getUiFiles('/js/app.js'),
    tasks: getUiFiles('/js/tasks.js'),
    addTasks: getUiFiles('/js/addTasks.js')
}

const css = {
    root: getUiFiles('css/root.css'),
    nav: getUiFiles('css/nav.css'),
    home: getUiFiles('css/home.css'),
    form: getUiFiles('css/formPage.css'),
    tasks: getUiFiles('css/tasks.css'),
    about: getUiFiles('css/about.css'),
    faq: getUiFiles('css/faq.css')
}

const img = {
    tasks: getUiFiles('img/tasks.svg'),
    devProductivity: getUiFiles('img/dev_productivity.svg'),
    onlineOrganizer: getUiFiles('img/online_organizer.svg'),
    organizationProjects: getUiFiles('img/organization_projects.svg'),
    timeManagement: getUiFiles('img/time_management.svg'),
    workTogether: getUiFiles('img/work_together.svg'),
    iconChecklist: getUiFiles('img/check-list.svg'),
    teamWork: getUiFiles('img/team_work.svg'),
    packet: getUiFiles('img/packet.svg'),
    startupLife: getUiFiles('img/startup_life.svg'),
    startBuilding: getUiFiles('img/start_building.svg'),
    outerSpace: getUiFiles('img/outer_space.svg')
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
        url: '/about',
        method: 'GET',
        handler: (req, res) => {
            res.writeHead(200, 'text/html');
            res.end(htmls.about);
        }
    },
    {
        url: '/faq',
        method: 'GET',
        handler: (req, res) => {
            res.writeHead(200, 'text/html');
            res.end(htmls.faq);
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
    {
        url: '/addtask',
        method: 'GET',
        handler: (req, res) => {
            res.writeHead(200, 'text/html');
            res.end(htmls.addTask);
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
    {
        url: '/js/app.js',
        method: 'GET',
        handler: (req, res) => {
            res.writeHead(200, 'application/javascript');
            res.end(js.app);
        }
    },
    {
        url: '/js/tasks.js',
        method: 'GET',
        handler: (req, res) => {
            res.writeHead(200, 'application/javascript');
            res.end(js.tasks);
        }
    },
    {
        url: '/js/addTasks.js',
        method: 'GET',
        handler: (req, res) => {
            res.writeHead(200, 'application/javascript');
            res.end(js.addTasks);
        }
    },
    // CSS
    {
        url: '/css/root.css',
        method: 'GET',
        handler: (req, res) => {
            res.writeHead(200, 'text/css');
            res.end(css.root);
        }
    },
    {
        url: '/css/nav.css',
        method: 'GET',
        handler: (req, res) => {
            res.writeHead(200, 'text/css');
            res.end(css.nav);
        }
    },
    {
        url: '/css/home.css',
        method: 'GET',
        handler: (req, res) => {
            res.writeHead(200, 'text/css');
            res.end(css.home);
        }
    },
    {
        url: '/css/faq.css',
        method: 'GET',
        handler: (req, res) => {
            res.writeHead(200, 'text/css');
            res.end(css.faq);
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
    },
    {
        url: '/css/about.css',
        method: 'GET',
        handler: (req, res) => {
            res.writeHead(200, 'text/css');
            res.end(css.about);
        }
    },
    // IMG
    {
        url: '/img/tasks.svg',
        method: 'GET',
        handler: (req, res) => {
            res.writeHead(200, {'Content-Type': 'image/svg+xml' });
            res.end(img.tasks);
        }
    },
    {
        url: '/img/dev_productivity.svg',
        method: 'GET',
        handler: (req, res) => {
            res.writeHead(200, {'Content-Type': 'image/svg+xml' });
            res.end(img.devProductivity);
        }
    },
    {
        url: '/img/online_organizer.svg',
        method: 'GET',
        handler: (req, res) => {
            res.writeHead(200, {'Content-Type': 'image/svg+xml' });
            res.end(img.onlineOrganizer);
        }
    },
    {
        url: '/img/organization_projects.svg',
        method: 'GET',
        handler: (req, res) => {
            res.writeHead(200, {'Content-Type': 'image/svg+xml' });
            res.end(img.organizationProjects);
        }
    },
    {
        url: '/img/time_management.svg',
        method: 'GET',
        handler: (req, res) => {
            res.writeHead(200, {'Content-Type': 'image/svg+xml' });
            res.end(img.timeManagement);
        }
    },
    {
        url: '/img/work_together.svg',
        method: 'GET',
        handler: (req, res) => {
            res.writeHead(200, {'Content-Type': 'image/svg+xml' });
            res.end(img.workTogether);
        }
    },
    {
        url: '/img/check-list.svg',
        method: 'GET',
        handler: (req, res) => {
            res.writeHead(200, {'Content-Type': 'image/svg+xml' });
            res.end(img.iconChecklist);
        }
    },
    {
        url: '/img/team_work.svg',
        method: 'GET',
        handler: (req, res) => {
            res.writeHead(200, {'Content-Type': 'image/svg+xml' });
            res.end(img.teamWork);
        }
    },
    {
        url: '/img/packet.svg',
        method: 'GET',
        handler: (req, res) => {
            res.writeHead(200, {'Content-Type': 'image/svg+xml' });
            res.end(img.packet);
        }
    },
    {
        url: '/img/startup_life.svg',
        method: 'GET',
        handler: (req, res) => {
            res.writeHead(200, {'Content-Type': 'image/svg+xml' });
            res.end(img.startupLife);
        }
    },
    {
        url: '/img/start_building.svg',
        method: 'GET',
        handler: (req, res) => {
            res.writeHead(200, {'Content-Type': 'image/svg+xml' });
            res.end(img.startBuilding);
        }
    },
    {
        url: '/img/outer_space.svg',
        method: 'GET',
        handler: (req, res) => {
            res.writeHead(200, {'Content-Type': 'image/svg+xml' });
            res.end(img.outerSpace);
        }
    },
];

module.exports = routes;
