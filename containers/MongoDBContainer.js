const logger = require("../src/logs");

class MongoDBContainer {
    constructor(model) {
        this.model = model;
    }

    async getItems() {
        try {
            const arr = await this.model.find({});

            return arr;
        } catch (err) {
            console.log(err);
            logger.error(err);
        }
    }

    async getItemById(id) {
        let item = {};
        try {
            item = this.model.findById(id);
        } catch (err) {
            logger.error(err);
        }
        return item;
    }

    async createItem(item) {
        let newItem = new this.model(item);
        await newItem.save();
        return newItem;
    }

    async updateItem(id, newItem) {
        try {
            let product = await this.getItemById(id);
            Object.assign(product, newItem);
            await product.save();
            return product;
        } catch (err) {
            logger.error(err);
        }
    }

    async deleteItem(id) {
        const deleted = await this.model.deleteOne({ _id: id });
        return deleted;
    }

    async getByQuery(query) {
        return await this.model.find(query);
    }
}

module.exports = MongoDBContainer;