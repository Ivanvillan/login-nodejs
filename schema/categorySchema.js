const Joi = require('joi');

const iduser = Joi.number().integer();
const name = Joi.string().max(45);

const getByIDCategorySchema = Joi.object({
    iduser: iduser.required()
});

const createCategorySchema = Joi.object({
    name: name.required()
});

module.exports = {
    createCategorySchema,
    getByIDCategorySchema
}

