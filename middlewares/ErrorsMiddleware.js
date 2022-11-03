const CustomError = require("../models/CustomError");

class ErrorsMiddleware {
    constructor() {}

    error404(req, res, next) {
        return res.status(404).json({
            descripcion: `Route ${req.url} and method ${req.method} not implemented`,
        });
    }

    errorLogger(err, req, res, next) {
        next();
    }

    errorHandler(err, req, res, next) {
        console.log(err);
        if (typeof err !== CustomError) return res.status(500).json(err);
        return res.status(err.status).json(err.msg);
    }
}

module.exports = ErrorsMiddleware;
