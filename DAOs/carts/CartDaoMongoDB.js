const logger = require("../../src/logs")
const MongoContainer = require("../../Containers/MongoDBContainer");

class CartDaoMongoDB extends MongoContainer {
    constructor(model) {
        super(model);
    }

    deleteProductFromCart = async (userId, prodId) => {
        try {
            const cart = await this.getCartByUserId(userId);
            cart.products.pull({ productId: prodId });
            await cart.save();
        } catch (err) {
            logger.error(err);
        }
    };

    getCartByUserId = async (id) => {
        const cart = await this.model.findOne({ user_id: id });
        console.log(cart);
        return cart;
    };

    addCartProduct = async (id, product) => {
        let cart = await this.getCartByUserId(id);
        //no cart, create a cart
        if (!cart || cart.products.length === 0) {
            cart = new this.model({ user_id: id });
            cart.products = [];
            cart.products.push(product);
            await cart.save();

            return cart.products;
        }

        const idx = cart.products?.findIndex((prod) => {
            return prod.productId === product.productId;
        });
        if (idx >= 0) cart.products[idx].quantity += product.quantity ?? 1;
        else cart.products.push(product);
        await cart.save();
    };
}

module.exports = CartDaoMongoDB;