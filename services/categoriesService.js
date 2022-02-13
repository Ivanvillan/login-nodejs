const connection = require('./../lib/database');
const boom = require('@hapi/boom');

class CategoriesService {
    constructor() {

    }

    async get() {
        const sql = 'SELECT * FROM categories';
        return new Promise( (resolve, reject) => {
            connection.query(sql, (err, row) => {
                if (!err) {
                    resolve(row);
                } else {
                    reject(boom.badRequest(err.sqlMessage));
                }
            });
        });
    }

    async getByID(iduser) {
        const sql = 'SELECT * FROM categories WHERE iduser = ?';
        return new Promise( (resolve, reject) => {
            connection.query(sql, [iduser], (err, row) => {
                if (!err) {
                    resolve(row);
                } else {
                    reject(boom.badRequest(err.sqlMessage));
                }
            });
        });
    }

    async create(data, payload) {
        const sql = 'INSERT INTO categories (name, iduser) VALUES (?, ?)';
        const name = data.name;
        const iduser = payload;
        return new Promise( (resolve, reject) => {
            connection.query(sql, [name, iduser], (err) => {
                if (!err) {
                    resolve(data);
                } else {
                    reject(boom.badRequest(err.sqlMessage));
                }
            })
        });
    }
}

module.exports = CategoriesService;