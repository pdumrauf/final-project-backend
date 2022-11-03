const ProductDAOMongo = require("../DAOs/products/ProductsDAOMongoDB");

const { Product } = require("../models/Product");

const storageMapper = {
    MONGO: () => new ProductDAOMongo(Product),
};

module.exports = (storage) => {
    const storageDAOFn = storageMapper[storage] || storageMapper.MEMORY;
    const dao = storageDAOFn();
    return dao;
};