const knex = require('knex')(require('../../../knexfile'));

class Database {
    constructor() {
        this.knex = knex;
    }
}

module.exports = Database;
