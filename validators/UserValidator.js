const Joi = require("joi");

class UserValidator {
    constructor() {}

    get schema() {
        return Joi.object({
            name: Joi.string().min(3).max(30).required(),
            phone: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            address: Joi.string().min(3).max(30).required(),
            password: Joi.string().min(6).max(300).required(),
        });
    }

    async validate(data) {
        const validated = await this.schema.validateAsync(data);
        console.log({ validated });
    }
}

module.exports = UserValidator;