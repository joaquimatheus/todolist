require("./dotenv");
const path = require("path");

module.exports = {
    client: "pg",
    connection: {
        host: process.env.PSQL_HOST,
        database: process.env.PSQL_DATABASE,
        user: process.env.PSQL_USER,
        password: process.env.PSQL_PASSWORD,
    },
    pool: { min: 0, max: 10 },
    migrations: {
        directory: "./nodejs/migrations",
    },
};
