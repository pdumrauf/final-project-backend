//TODO

class CartService {
    constructor(repository) {
        this.repository = repository;
    }

    async getAll() {
        const carts = await this.repository.getItems();
        return carts;
    }

    async getById(cartId) {
        const cart = await this.repository.getItemById(cartId);
        return cart;
    }

    async createCart(userId) {
        await this.repository.createCart(userId);
    }

    async getCartByUserId(userId) {
        const data = await this.repository.getCartByUserId(userId);
        return data;
    }

    async deleteCart(cartId) {
        console.log({ cartId });
        return await this.repository.deleteItem(cartId);
    }

    async addCartProduct(id, product) {
        return await this.repository.addCartProduct(id, product);
    }

    async deleteProductFromCart(userId, productId) {
        return await this.repository.deleteProductFromCart(userId, productId);
    }
}

module.exports = CartService;