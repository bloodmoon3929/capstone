// sessionOption.js
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const dbOptions = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
};

const sessionStore = new MySQLStore(dbOptions);

const sessionOptions = {
    key: 'session_cookie_name',
    secret: 'session_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
};

module.exports = sessionOptions;
