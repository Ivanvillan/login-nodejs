const { config } = require('./../config/config');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.pass,
    database: config.db
});

module.exports = connection;