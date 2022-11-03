const CustomError = require("../models/CustomError");

class AuthController {
    constructor(service) {
        this.service = service;
    }

    async signUp(req, res, next) {
        try {
            const user = await this.service.signUp(req.body);
            if (user.error) throw new CustomError(user.msg, 401);
            return res.status(201).json(user);
        } catch (err) {
            return next(err);
        }
    }

    async signIn(req, res, next) {
        try {
            const user = await this.service.signIn(req.body);
            if (user.error) throw new CustomError(user.msg, 401);
            return res.status(201).json(user);
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = AuthController;
