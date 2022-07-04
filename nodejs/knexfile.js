require("../dotenv");
const path = require("path");

module.exports = {
    client: "pg",
    connection: {
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        user: process.env.PG_USER,
        password: process.env.PG_PWD,
    },
    pool: { min: 0, max: 10 },
    migrations: {
        directory: "migrations",
    },
};
