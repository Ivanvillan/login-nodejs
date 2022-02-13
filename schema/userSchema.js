const Joi = require('joi');

const id = Joi.number().integer().id();
const name = Joi.string().min(3).max(20);
const lastname = Joi.string().min(2).max(20);
const email = Joi.string().email();
const username = Joi.string().max(45);
const password = Joi.string().min(6);

const getUserSchema = Joi.object({
    id: id.required()
});
const createUserSchema = Joi.object({
    name: name.required(),
    lastname: lastname.required(),
    email: email.required(),
    username: username,
    password: password.required()
});

module.exports = {
    getUserSchema,
    createUserSchema
};