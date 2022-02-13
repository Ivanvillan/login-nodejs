const connection = require('./../lib/database');
const boom = require('@hapi/boom');

class PostsService {
    constructor() {

    }
    async get() {
        const sql = `
            SELECT * FROM posts
            INNER JOIN categories
            ON posts.idcategory = categories.idcategory
        `;
        return new Promise( (resolve, reject) => {
            connection.query(sql, (err, row) => {
                if (!err) {
                    resolve(row);
                } else {
                    reject(boom.badRequest(err.sqlMessage));
                }
            });
        });
    };
    async create(data, params) {
        return new Promise( (resolve, reject) => {
            const sql = 'INSERT INTO posts (title, subtitle, content, iduser, idcategory) VALUES (?, ?, ?, ?, ?)';
            const title = data.title;
            const subtitle = data.subtitle;
            const content = data.content;
            const iduser = params;
            const idcategory = data.idcategory;
            connection.query(sql, [title, subtitle, content, iduser, idcategory], (err, row) => {
                if (!err) {
                    resolve(data);
                } else {
                    reject(boom.badRequest(err.sqlMessage));
                }
            });
        });
    };
    async update(id, changes) {
        const getPost = 'SELECT * FROM posts WHERE idpost = ?';
        connection.query(getPost, [id], (err, row) => {
            if (!err) {
                const data = row[0];
                const title = changes.title ?? data.title;
                const subtitle = changes.subtitle ?? data.subtitle;
                const content = changes.content ?? data.content;
                const idcategory = changes.idcategory ?? data.idcategory;
                const active = changes.active ?? data.active;
                const updatePost = 'UPDATE posts SET title = ?, subtitle = ?, content = ?, idcategory = ?, active = ?';
                return new Promise( (resolve, reject) => {
                    connection.query(updatePost, [title, subtitle, content, idcategory, active], (err, row) =>{
                        if (!err) {
                            resolve(row);
                        } else {
                            reject(boom.badRequest(err.sqlMessage));
                        }
                    });
                });
            } else {
                throw boom.badRequest(err);
            }
        });
    }
};

module.exports = PostsService;