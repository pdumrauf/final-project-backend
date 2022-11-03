const MongoContainer = require("../../containers/MongoDBContainer");

class UserDaoMongoDB extends MongoContainer {
    constructor(model) {
        super(model);
    }

    async getByEmail(email) {
        try {
            const user = await this.model.findOne({ email });
            return user;
        } catch (err) {
            console.log(err);
        }
    }

    async addCart(userId, cartId) {
        try {
            await this.model.findOneAndUpdate({ _id: userId }, { cart_id: cartId });
            return cartId;
        } catch (err) {
            console.log(err);
        }
    }

    async deleteCart(cartId) {
        try {
            const user = this.model.findOneAndUpdate({ cart_id: cartId }, { $unset: { cart_id: 1 } });
            return user;
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = UserDaoMongoDB;