const MessageDAOMongoDB = require("../daos/messages/MessagesDAOMongoDB");
const { Message } = require("../models/Message");

const storageMapper = {
    MONGO: () => new MessageDAOMongoDB(Message),
};

module.exports = (storage) => {
    const storageDAOFn = storageMapper[storage] || storageMapper.MONGO;
    const dao = storageDAOFn();
    return dao;
};