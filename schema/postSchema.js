const Joi = require('joi');

const title = Joi.string().max(100);
const subtitle = Joi.string().max(255);
const content = Joi.string();
const idcategory = Joi.number().integer();

const createPostSchema = Joi.object({
    title: title.required(),
    subtitle: subtitle.required(),
    content: content.required(),
    idcategory: idcategory.required()
});

module.exports = {
    createPostSchema
}