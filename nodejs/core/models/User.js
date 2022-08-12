const bcrypt = require('bcrypt');
const crypto = require('crypto');

async function getRandomToken() {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buff) => {
            if (err) { return reject(err); }
            resolve(buff.toString('hex'))
        })
    })
}

class UserModel {
    constructor(dB) {
        this.db = dB;
    }

    async createUserAndAccount(name, email, password) {
        const hashedPassword = await bcrypt.hash(password, 7);

        const userRows = await this.db.knex('users').insert({
            name,
            email,
            password: hashedPassword
        }).returning('*');

        const [ user ] = userRows;
        
        const accountRows = await this.db.knex('accounts').insert({
            created_by_user_id: user.id, name
        }).returning('*');

        const [ account ] = accountRows;
        await this.db.knex('users_in_accounts').insert({
            account_id: account.id,
            user_id: user.id,
            role: 'admin'
        });

        const userInAccounts = this.db.knex('users_in_accounts').where({
            account_id: account.id,
            user_id: user.id,
            role: 'admin'
        }).first();

        return { user, account };
    }

    async getUserByEmail(email) {
        const user = await this.db.knex('users').where({ email }).first();
        if (!user) { throw new Error(`User ${email} not found!`); }

        return user;
    }

    async login(email, password) {
        const user = await this.getUserByEmail(email);
        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword) {
            throw new Error(`Invalid password for: ${email}`);
        }

        return user;
    }

    async createNewLoginToken(email) {
        const user = await this.getUserByEmail(email);
        const loginToken = await getRandomToken();

        return this.db.knex('users').update({
            login_token: loginToken
        }).where({ id: user.id }).returning('*');
    }

    async validateLoginToken(loginToken) {
        const user = await this.db.knex('users').where({
            login_token: loginToken
        }).first();

        if(!user) { throw new Error('Invalid token') };
    }

    async setNewPasswordByLoginToken(loginToken, password) {
        const hashedPassword = await bcrypt.hash(password, 7);

        return this.db.knex('users').update({
            password: hashedPassword,
            login_token: null
        }).where({
            login_token: loginToken
        });
    }

    async getAccounts(userId) {
        return this.db
            .knex('accounts as a')
            .join('users_in_accounts as uia', 'uia.account_id', 'a.id')
            .where({
                'uia.user_id': userId
            }).select('a.*');
    }

    async tryGetUserById(userId) {
        const user = await this.db.knex('users').where({ id: userId }).first();
        return user;
    }

    async getUserById(userId) {
        const user = await this.tryGetUserById(userId);
        if (!user) { throw new Error(`User: ${userId} not found`);}

        return user;
    }
    
}

module.exports = UserModel
