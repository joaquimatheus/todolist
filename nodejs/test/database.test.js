const Database = require('../core/db/Database');

const assert = require('assert');

describe('Basic DB Test', () => {
    it('Init database', async () => {
        const db = new Database();

        assert(db);
        assert(await db.knex('users').select('*'));
    });
})
