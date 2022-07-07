const Database = require("../core/models/Database");
const UserModel = require("../core/models/User");
const crypto = require('crypto');

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
    return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function toBase64(str) {
    return Buffer.from(str).toString('base64');
}

function toBase64UrlEncoded(str) {
    return urlEncodeBase64(toBase64(str));
}

function getHS256(text, secret) {
    const hmac = crypto.createHmac('sha256', secret);
    return hmac.update(text).digest('base64');
}

function getJwtTokenByUser(user) {
    const header = { typ: 'JWT', alg: 'HS256' };
    const payload = { userId: user.id };

    const headerString = toBase64UrlEncoded(JSON.stringify(header));
    const payloadString = toBase64UrlEncoded(JSON.stringify(payload));

    const token = `${headerString}.${payloadString}`;
    const signature = urlEncodeBase64(getHS256(token, process.env.JWT_SECRET));

    return `${token}.${signature}`;
}

function validateJwtToken(req, res, next) {
    const { authorization } = req.headers;
    const token = (authorization || '').replace('Bearer ', '')

    if (!token) {
        res.writeHead(403, 'application/json');
        res.end(JSON.stringify({ forbidden: true }));
        return;
    }

    const [ header, payload, signature ] = token.split('.');
    const checkSignature = urlEncodeBase64(getHS256(
        `${header}.${payload}`,
        process.env.JWT_SECRET
    ));

    if (checkSignature !== signature) {
        res.writeHead(401, 'application/json');
        res.end(JSON.stringify({
            invalidToken: true,
            unauthorized: true
        }));
        return;
    }

    next();
}

const routes = [
    {
        url: "/signup",
        method: "POST",
        handler: async(req, res) => {
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
                console.log(ex);

                res.writeHead(201, "application/json");
                res.end("Invalid user data, please try again");
                return;
            }
        },
    },
    {
        url: "/login",
        method: 'POST',
        handler: async(req, res) => {
            const { email, password } = await jsonParse(req);
            const userModel = new UserModel(new Database());

            const user = await userModel.login(email, password);
            const token = getJwtTokenByUser(user);

            console.log(`Logged - ${email}`);

            res.writeHead(200, 'application/json');
            res.end(JSON.stringify({ token, ok: true }));
        }
    },
    {
        url: '/tasks',
        method: 'GET',
        middlewares: [ validateJwtToken ],
        handler: async (req, res) => {
            res.writeHead(200, 'application/json');
            res.end(JSON.stringify({ok: true}));
        }
    }
];

module.exports = { routes };
