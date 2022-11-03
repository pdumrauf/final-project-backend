const MongoContainer = require("../../containers/MongoDBContainer");

class OrderDAOMongoDB extends MongoContainer {
    constructor(model) {
        super(model);
    }

    async getCount() {
        return await this.model.countDocuments();
    }
}

module.exports = OrderDAOMongoDB;