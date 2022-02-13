const express = require('express');

const authRouter = require('./authRouter');
const usersRouter = require('./usersRouter');
const categoriesRouter = require('./categoriesRouter');
const postsRouter = require('./postsRouter');

function routerApi (app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/auth', authRouter);
    router.use('/users', usersRouter);
    router.use('/categories', categoriesRouter);
    router.use('/posts', postsRouter);
}

module.exports = routerApi;
