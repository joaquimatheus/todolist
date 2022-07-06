CREATE SEQUENCE seq_users;
CREATE TABLE users (
    id INT NOT NULL
        CONSTRAINT pk_users
        PRIMARY KEY DEFAULT nextval('seq_users'),

    email TEXT NOT NULL CONSTRAINT uq_users_email UNIQUE,
    name TEXT NOT NULL,
    password TEXT NOT NULL,

    utc_created_on TIMESTAMP NOT NULL
        CONSTRAINT df_users_utc_created_on DEFAULT(now())
);
ALTER SEQUENCE seq_users OWNED BY users.id;

CREATE SEQUENCE seq_accounts;
CREATE TABLE accounts (
    id INT NOT NULL
        CONSTRAINT pk_accounts
        PRIMARY KEY DEFAULT nextval('seq_accounts'),
    
    created_by_user_id INT NOT NULL
        CONSTRAINT fk_accounts_users
        REFERENCES users(id),

    name TEXT NOT NULL,

    utc_created_on TIMESTAMP NOT NULL
        CONSTRAINT df_accounts_utc_created_on DEFAULT(now())
);
ALTER SEQUENCE seq_accounts OWNED BY accounts.id;

CREATE TYPE user_role AS ENUM ('admin', 'user');
CREATE TABLE users_in_accounts (
    user_id INT NOT NULL
        CONSTRAINT fk_user_in_accounts_users
        REFERENCES users(id),
    
    account_id INT NOT NULL
        CONSTRAINT fk_user_in_accounts_accounts
        REFERENCES accounts(id),

    role user_role NOT NULL,

    CONSTRAINT pk_user_in_accounts PRIMARY KEY (user_id, account_id),

    utc_created_on TIMESTAMP NOT NULL
        CONSTRAINT df_user_in_accounts_utc_created_on DEFAULT(now())
);

CREATE SEQUENCE seq_categories;
CREATE TABLE categories (
    id INT NOT NULL
        CONSTRAINT pk_categories
        PRIMARY KEY DEFAULT nextval('seq_categories'),

    account_id INT NOT NULL
        CONSTRAINT fk_categories_accounts
        REFERENCES accounts(id),

    name TEXT NOT NULL,

    utc_created_on TIMESTAMP NOT NULL
        CONSTRAINT df_categories_utc_created_on DEFAULT(now())
);
ALTER SEQUENCE seq_categories OWNED BY categories.id;

CREATE SEQUENCE seq_tasks;
CREATE TABLE tasks (
    id INT NOT NULL
        CONSTRAINT pk_tasks
        PRIMARY KEY DEFAULT nextval('seq_tasks'),

    account_id INT NOT NULL
        CONSTRAINT fk_tasks_accounts
        REFERENCES accounts(id),

    category_id INT
        CONSTRAINT fk_tasks_categories
        REFERENCES categories(id),

    title TEXT NOT NULL,

    utc_created_on TIMESTAMP NOT NULL
        CONSTRAINT df_tasks_utc_created_on DEFAULT(now())
);
ALTER SEQUENCE seq_tasks OWNED BY tasks.id;
