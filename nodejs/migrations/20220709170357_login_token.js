exports.up = function(knex) {
    return knex.raw(`
        ALTER TABLE users ADD COLUMN login_token TEXT
            CONSTRAINT uq_users_login_token UNIQUE;
    `)   
};

exports.down = function(knex) {
    return knew.raw(`
        ALTER TABLE users DROP COLUMN login_token;
    `)
};
