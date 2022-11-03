const messageDAOFactory = require("../factories/messageDAOFactory");

let instance = null;

class MessageRepository {
    constructor() {
        this.dao = messageDAOFactory(process.env.STORAGE);
    }
    async createMessage(message) {
        return await this.dao.createItem(message);
    }

    async getAll() {
        return await this.dao.getItems();
    }

    async getByQuery(query) {
        return await this.dao.getByQuery(query);
    }

    static getInstance() {
        if (!instance) instance = new MessageRepository();
        return instance;
    }
}

module.exports = MessageRepository;