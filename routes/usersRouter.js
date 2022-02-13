const express = require('express');

const UsersService = require('./../services/usersService');
const validatorHandler = require('./../middleware/validatorHandler');
const { getUserSchema, createUserSchema } = require('./../schema/userSchema');
const passport = require('passport');

const router = express.Router();
const service = new UsersService();

router.get('/', 
    passport.authenticate('jwt', { session: false}),
    async (req, res, next) => {
    try {
        const users = await service.get();
        res.status(200).json(users);
    } catch (error) {
        next(error)
    }
});

router.get('/:iduser', 
    passport.authenticate('jwt', { session: false}),
    async (req, res, next) => {
    try {
        const id = req.params;
        const user = await service.getByID(id);
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
});

router.post('/',
    passport.authenticate('jwt', { session: false}),
    validatorHandler(createUserSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const newUser = await service.create(body);
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;