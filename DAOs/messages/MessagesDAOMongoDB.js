const MongoContainer = require("../../containers/MongoDBContainer");

class OrderDaoMongoDB extends MongoContainer {
    constructor(model) {
        super(model);
    }
}

module.exports = OrderDaoMongoDB;