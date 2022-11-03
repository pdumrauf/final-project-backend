const OrderRepository = require("../repositories/OrderRepository");
const OrderService = require("../services/OrderService");

const ProductRepository = require("../repositories/ProductRepository");
const ProductService = require("../services/ProductService");
const sendMail = require("../src/sendEmail");
const CustomError = require("../models/CustomError");

class CartController {
  constructor(service) {
      this.service = service;
  }

  getCart = async (req, res, next) => {
    try {
        const cart = await this.service.getCartByUserId(req.user.id);
        console.log({ cart });

        return res.json(cart);
    } catch (err) {
        next(err);
    }
  };

  _createCart = async (req, res, next) => {
    try {
        const newCart = await this.service.createCart(req.body.userId);
        return res.json(newCart);
    } catch (err) {
        return next(err);
    }
  };

  addProductsToCart = async (req, res, next) => {
    try {
        const productRepository = ProductRepository.getInstance();
        const productService = new ProductService(productRepository);
        const completeProduct = await productService.getOne(req.body.productId);
        completeProduct.quantity = req.body.quantity;

        if (!this.service.getCartByUserId(req.user.id)) await this.service.createCart(req.user.id);
        await this.service.addCartProduct(req.user.id, completeProduct);
        return res.sendStatus(204);
    } catch (err) {
        return next(err);
    }
  };

  deleteCart = async (req, res, next) => {
    try {
        await this.service.deleteCart(req.params.id);
        return res.sendStatus(204);
    } catch (err) {
        return next(err);
    }
  };

  deleteProductFromCart = async (req, res, next) => {
    try {
        await this.service.deleteProductFromCart(req.user.id, req.params.prodId);
        console.log("sip");
        return res.sendStatus(204);
    } catch (err) {
        return next(err);
    }
  };

  generateOrder = async (req, res, next) => {
    try {
        const orderRepository = OrderRepository.getInstance();
        const orderService = new OrderService(orderRepository);

        const cart = await this.service.getCartByUserId(req.user.id);
        const orderNumber = await orderService.getCount();
        if (!cart) throw new CustomError("empty cart", 400);
        const order = {
            products: cart.products,
            orderNumber,
            userEmail: req.user.email,
            state: "generated",
        };

        console.log(order);

        const generatedOrder = await orderService.createOrder(order);

        const formattedProducts = cart.products.map(
            (product) =>
                `Product: ${product.title} <br />
        Price: ${product.price}
        `
        );
        await sendMail(
            process.env.ADMIN_EMAIL,
            `New order from ${req.user.name} - ${req.user.email}`,
            `<p>${formattedProducts.join("</p><p>")}</p>`
        );

        return res.json(generatedOrder);
    } catch (err) {
        return next(err);
    }
  };
}

module.exports = CartController;