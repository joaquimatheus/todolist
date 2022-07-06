const Database = require('../../core/models/Database');
const UserModel = require('../../core/models/User');

const assert = require('assert');

after(async() => {
    const db = new Database();
    await db.knex.destroy();
});

describe('User Model Test', () => {
    it('createdUserAndAccount()', async() => {
        const body = {
            name: `Case ${new Date().getTime()}`,
            email: `${new Date().getTime()}@foo.com`,
            password: '123'
        };

        const userModel = new UserModel(new Database());

        const { account, user } = await userModel.createUserAndAccount(
            body.name,
            body.email,
            body.password
        );

        assert(account);
        assert(user);
    });

    it.only('login()', async() => {
        const name = `rat${new Date().getTime()}`;
        const email = `rat${new Date().getTime()}@zaz.com`;
        const password = '123456';

        const userModel = new UserModel(new Database());

        const user = await userModel.createUserAndAccount(
            name,
            email,
            password
        );

        assert.rejects(async () => {
            await userModel.login(email, '1234');
        }, 'Invalid Password');

        assert(await userModel.login(email, password));
    })
})
