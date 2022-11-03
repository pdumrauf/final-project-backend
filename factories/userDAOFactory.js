const UserDaoMongoDB = require("../daos/users/UserDaoMongoDB");
const { User } = require("../models/User");

const storageMapper = {
    MONGO: () => new UserDaoMongoDB(User),
};

module.exports = (storage) => {
    const storageDAOFn = storageMapper[storage] || storageMapper.MONGO;
    const dao = storageDAOFn();
    return dao;
};