const Joi = require("joi");

class ProductValidator {
    constructor() {}

    get schema() {
        return Joi.object({
            title: Joi.string().min(3).max(30).required(),
            description: Joi.string().min(3).max(30).required(),
            photo_url: Joi.string().email().required(),
            category: Joi.string().min(3).max(30).required(),
            price: Joi.number(),
        });
    }

    async validate(data) {
        const validated = await this.schema.validateAsync(data);
        return validated;
    }
}

module.exports = ProductValidator;