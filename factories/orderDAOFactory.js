const OrderDaoMongoDB = require("../daos/orders/OrderDaoMongoDB");
const { Order } = require("../models/Order");

const storageMapper = {
    MONGO: () => new OrderDaoMongoDB(Order),
};

module.exports = (storage) => {
    const storageDAOFn = storageMapper[storage] || storageMapper.MONGO;
    const dao = storageDAOFn();
    return dao;
};
