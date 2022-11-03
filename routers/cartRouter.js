const express = require("express");
const { Router } = express;
const passport = require("passport");

const CartRepository = require("../repositories/CartRepository");
const CartService = require("../services/CartService");
const CartController = require("../Controllers/CartController");

const cartRouterFn = () => {
    const cartRepository = CartRepository.getInstance();
    const cartService = new CartService(cartRepository);
    const cartController = new CartController(cartService);

    const cartRouter = Router();

    cartRouter.use(passport.authenticate("jwt"));

    cartRouter.delete("/:prodId", cartController.deleteProductFromCart.bind(cartController));
    cartRouter.get("/", cartController.getCart.bind(cartController));
    cartRouter.post("/", cartController.addProductsToCart.bind(cartController));
    cartRouter.post("/buy", cartController.generateOrder.bind(cartController));

    return cartRouter;
};

// cartRouter.post("/:id", cartController.generateOrder);

module.exports = cartRouterFn;