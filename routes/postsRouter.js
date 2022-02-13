const express = require('express');

const PostsService = require('./../services/postsService');
const validatorHandler = require('./../middleware/validatorHandler');
const { createPostSchema } = require('./../schema/postSchema');
const passport = require('passport');

const router = express.Router();
const service = new PostsService();

router.get('/', 
    passport.authenticate('jwt', { session: false}),
    async (req, res, next) => {
        try {
            const posts = await service.get();
            res.status(200).json(posts);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/', 
    passport.authenticate('jwt', { session: false }),
    validatorHandler(createPostSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const iduser = req.user['sub'];
            const newPost = service.create(body, iduser); 
            res.status(201).json(newPost);
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:idpost',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        try {
            const idpost = req.params;
            const changes = req.body;
            const updatePost = await service.update(idpost, changes);
            res.json(updatePost);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;