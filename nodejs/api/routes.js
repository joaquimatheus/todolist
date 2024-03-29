const Database = require("../core/models/Database");
const UserModel = require("../core/models/User");
const crypto = require("crypto");
const Logger = require('../../shared/logger');

const logger = new Logger();

async function jsonParse(req) {
    return new Promise((resolve, reject) => {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("error", reject);

        req.on("end", () => {
            let json;
            try {
                resolve(JSON.parse(body));
            } catch (ex) {
                reject(ex);
            }
        });
    });
}

function urlEncodeBase64(str) {
    return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function toBase64(str) {
    return Buffer.from(str).toString("base64");
}

function toBase64UrlEncoded(str) {
    return urlEncodeBase64(toBase64(str));
}

function getHS256(text, secret) {
    const hmac = crypto.createHmac("sha256", secret);
    return hmac.update(text).digest("base64");
}

function getJwtTokenByUser(user) {
    const header = { typ: "JWT", alg: "HS256" };
    const payload = { userId: user.id };

    const headerString = toBase64UrlEncoded(JSON.stringify(header));
    const payloadString = toBase64UrlEncoded(JSON.stringify(payload));

    const token = `${headerString}.${payloadString}`;
    const signature = urlEncodeBase64(getHS256(token, process.env.JWT_SECRET));

    return `${token}.${signature}`;
}

function validateJwtToken(req, res, next) {
    const { authorization } = req.headers;
    const token = (authorization || "").replace("Bearer ", "");

    if (!token) {
        res.writeHead(403, "application/json");
        res.end(JSON.stringify({ forbidden: true }));
        return;
    }

    const [header, payload, signature] = token.split(".");
    const checkSignature = urlEncodeBase64(
        getHS256(`${header}.${payload}`, process.env.JWT_SECRET)
    );

    if (checkSignature !== signature) {
        res.writeHead(401, "application/json");
        res.end(
            JSON.stringify({
                invalidToken: true,
                unauthorized: true,
            })
        );
        return;
    }

    const payloadJson = JSON.parse(
        Buffer.from(payload, 'base64').toString('utf-8')
    )

    req.userId = payloadJson.userId;
    next();
}

async function validateAccountId(req, res, next) {
    const db = new Database();
    const accountId = req.headers['account_id'];

    console.log(accountId);

    const userInAccount = await db.knex('users_in_accounts').where({
        user_id: req.userId,
        account_id: accountId,
        role: 'admin'
    }).first();

    if(!userInAccount) {
        res.writeHead(401, 'application/json');
        res.end(JSON.stringify({
            invalidToken: false,
            unauthorized: true
        }))

        return;
    }

    req.accountId = accountId;
    next();
}

const routes = [
    {
        url: "/signup",
        method: "POST",
        handler: async (req, res) => {
            try {
                const { name, email, password } = await jsonParse(req);
                const userModel = new UserModel(new Database());

                const { user, account } = await userModel.createUserAndAccount(
                    name,
                    email,
                    password
                );

                console.log(`Created User and Account - ${(name, email)} `);

                res.writeHead(200, "application/json");
                res.end(
                    JSON.stringify({
                        userId: user.id,
                        account: account.id,
                    })
                );
            } catch (ex) {
                logger.error(ex);

                res.writeHead(201, "application/json");
                res.end("Invalid user data, please try again");
                return;
            }
        },
    },
    {
        url: "/login",
        method: "POST",
        handler: async (req, res) => {
            const { email, password } = await jsonParse(req);
            const userModel = new UserModel(new Database());

            const user = await userModel.login(email, password);
            const token = getJwtTokenByUser(user);

            user.accounts = await userModel.getAccounts(user.id);

            logger.info(`Logged - ${email}`);

            res.writeHead(200, "application/json");
            res.end(JSON.stringify({ 
                token, 
                ok: true,
                accounts: user.accounts
            }));
        },
    },
    {
        url: "/tasks",
        method: "GET",
        middlewares: [validateJwtToken],
        handler: async (req, res) => {
            res.writeHead(200, "application/json");
            res.end(JSON.stringify({ ok: true }));
        },
    },
    {
        url: "/forget-password",
        method: "POST",
        handler: async (req, res) => {
            const { email } = await jsonParse(req);
            
            const userModel = new UserModel(new Database());

            user = await userModel.createNewLoginToken(email);

            console.log(user);

            res.writeHead(200, "application/json");
            res.end(JSON.stringify({ ok: true }));
        },
    },
    {
        url: "/login-token",
        method: "GET",
        handler: async (req, res) => {
            const userModel = new UserModel(new Database());
            await userModel.validateLoginToken(req.query.token);

            res.writeHead(200);
            res.end(JSON.stringify({ ok: true }));
        },
    },
    {
        url: "/set-new-password",
        method: "POST",
        handler: async (req, res) => {
            const userModel = new UserModel(new Database());
            const { token, password } = await jsonParse(req);

            await userModel.setNewPasswordByLoginToken(token, password);

            res.writeHead(200, 'application/json');
            res.end(JSON.stringify({ ok: true }));
        },
    },
    {
        url: '/tasks',
        method: 'GET',
        middlewares: [
            validateJwtToken,
            validateAccountId
        ],
        handler: async (req, res) => {
            const db = new Database();
            const tasks = await db.knex('tasks').where({
                account_id: req.accountId
            });

            console.log(req.userId, req.accountId);
            console.log(tasks);

            res.writeHead(200, 'application/json');
            res.end(JSON.stringify({ ok: true, tasks }));
        }
    },
    {
        url: '/tasks',
        method: 'POST',
        middlewares: [
            validateJwtToken,
            validateAccountId
        ],
        handler: async (req, res) => {
            const { title } = await jsonParse(req);
            const db = new Database();
            await db.knex('tasks').insert({
                account_id: req.accountId,
                title
            });

            res.writeHead(200, 'application/json');
            res.end(JSON.stringify({ ok: true }));
        }
    },
    {
        url: '/tasks',
        method: 'DELETE',
        middlewares: [
            validateJwtToken,
            validateAccountId
        ],
        handler: async (req, res) => {
            const db = new Database();


            await db.knex('tasks').whare({
                account_id: req.accountId,
                id: req.query.id
            }).del();

            res.writeHead(200, 'application/json');
            res.end(JSON.stringify({ ok: true }));
        }
    },
    {
        url: '/user',
        method: 'GET',
        middlewares: [ validateJwtToken ],
        handler: async (req, res) => {

            const userModel = new UserModel(new Database());
            const user = await userModel.getUserById(req.userId)

            res.writeHead(200, 'application/json');
            res.end(JSON.stringify({ ok: true, user }))
        }
    }
];

module.exports = { routes };
