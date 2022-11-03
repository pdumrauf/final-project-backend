const express = require("express");
const { Router } = express;

const ProductController = require("../controllers/ProductController");
const ProductRepository = require("../repositories/ProductRepository");
const ProductService = require("../services/ProductService");
const passport = require("passport");

const productRouterFn = () => {
    const productsRouter = Router();
    const productRepository = ProductRepository.getInstance();
    const productService = new ProductService(productRepository);
    const productController = new ProductController(productService);

    productsRouter.use(passport.authenticate("jwt"));

    productsRouter.get("/:id?", productController.getById.bind(productController));
    productsRouter.post("/", productController.createProduct.bind(productController));
    productsRouter.patch("/:id", productController.updateProduct.bind(productController));
    productsRouter.delete("/:id", productController.deleteProduct.bind(productController));

    return productsRouter;
};

module.exports = productRouterFn;