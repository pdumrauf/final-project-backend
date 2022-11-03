const CartDAOMongoDB = require("../daos/carts/CartDaoMongoDB");

const Cart = require("../models/Cart");

const storageMapper = {
    MONGO: () => new CartDAOMongoDB(Cart),
};

module.exports = (storage) => {
    const storageDAOFn = storageMapper[storage] || storageMapper.MONGO;
    const dao = storageDAOFn();
    return dao;
};
