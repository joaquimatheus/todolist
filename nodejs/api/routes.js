const Database = require("../core/models/Database");
const UserModel = require("../core/models/User");

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

            const { user, account } = await userModel.login(email, password);;

            console.log(`Logged - ${email}`);

            res.writeHead(200, 'application/json');
            res.end(JSON.stringify({ ok: true }));
        }
    },
];

module.exports = { routes };
