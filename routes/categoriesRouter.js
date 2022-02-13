const express = require('express');

const CategoriesService = require('./../services/categoriesService');
const validatorHandler = require('./../middleware/validatorHandler');
const { createCategorySchema, getByIDCategorySchema } = require('./../schema/categorySchema');
const { checkRoles } = require('./../middleware/authHandler')
const passport = require('passport');

const router = express.Router();
const service = new CategoriesService();

router.get('/', 
    passport.authenticate('jwt', { session: false}),
    checkRoles('admin'),
    async (req, res, next) => {
        try {
            const categories = await service.get();
            res.status(200).json(categories);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:iduser', 
    validatorHandler(getByIDCategorySchema, 'params' ),
    passport.authenticate('jwt', { session: false}),
    async (req, res, next) => {
        try {
            const iduser = req.params['iduser'];
            const categories = await service.getByID(iduser);
            res.status(200).json(categories);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/', 
    validatorHandler(createCategorySchema, 'body'),
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        try {
            const body = req.body;
            const payload = req.user['sub'];
            const newCategory = await service.create(body, payload);
            res.status(201).json(newCategory);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
