const CustomError = require("../models/CustomError");
const ObjectId = require("mongoose").Types.ObjectId;

class ProductController {
    constructor(service) {
        this.service = service;
    }

    async getById(req, res, next) {
        try {
            if (req.params.id) {
                if (ObjectId.isValid(req.params.id)) {
                    const prods = await this.service.getOne(req.params.id);
                    if (!prods) throw new CustomError("product not found", 404);
                    return res.status(200).json(prods);
                } else {
                    const prods = await this.service.getByCategory(req.params.id);
                    if (!prods || prods.length === 0) throw new CustomError("category not found", 404);
                    return res.json(prods);
                }
            }
            return res.json(await this.service.getAll());
        } catch (err) {
            return next(err);
        }
    }

    async createProduct(req, res, next) {
        try {
            const newProduct = await this.service.createProduct(req.body);
            return res.json(newProduct);
        } catch (err) {
            return next(err);
        }
    }

    async updateProduct(req, res, next) {
        try {
            const updatedProduct = await this.service.updateProduct(req.params.id, req.body);
            return res.status(200).json(updatedProduct);
        } catch (err) {
            return next(err);
        }
    }

    async deleteProduct(req, res, next) {
        try {
            await this.service.deleteProduct(req.params.id);
            return res.sendStatus(204);
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = ProductController;
