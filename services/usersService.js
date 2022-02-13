const connection = require('./../lib/database');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

class UsersService {
    constructor() {

    }
    async get() {
        const sql = 'SELECT * FROM users';
        return new Promise( (resolve, reject) => {
            connection.query(sql, (err, row, fields) => {
                if(!err) { 
                    resolve(row);
                } else {
                    reject(boom.badRequest(err.sqlMessage));
                }
            });
        });
    }
    async getByEmail(email) {
        const sql = 'SELECT * FROM users WHERE email = ?';
        return new Promise( (resolve, reject) => {
            connection.query(sql, [email], (err, row, fields) => {
                if(!err) { 
                    resolve(row);
                } else {
                    reject(boom.badRequest(err.sqlMessage));
                }
            });
        });
    }
    async getByID(id) {
        const sql = 'SELECT * FROM users WHERE iduser = ?';
        return new Promise( (resolve, reject) => {
            connection.query(sql, [id], (err, row, fields) => {
                if(!err) { 
                    resolve(row);
                } else {
                    reject(boom.badRequest(err.sqlMessage));
                }
            });
        });
    }
    async create(data) {
        const sql = 'INSERT INTO users (name, lastname, email, username, password) VALUES (?, ?, ?, ?, ?)';
        const name = data.name;
        const lastname = data.lastname;
        const email = data.email;
        const username = data.username;
        const hash = await bcrypt.hash(data.password, 10);
        return new Promise( (resolve, reject) => {
            connection.query(sql, [name, lastname, email, username, hash], (err) => {
                if (!err) {
                    delete data.password;
                    resolve(data);
                } else {
                    reject(boom.badRequest(err.sqlMessage));
                }
            })
        });
    }

}

module.exports = UsersService;