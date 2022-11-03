const MongoContainer = require("../../containers/MongoDBContainer");

class ProductsDAOMongoDB extends MongoContainer {
    constructor(model) {
        super(model);
    }

    async getByCategory(category) {
        console.log(category);
        return await this.model.find({ category: category.category });
    }
}

module.exports = ProductsDAOMongoDB;