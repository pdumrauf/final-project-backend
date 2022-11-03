class MessageService {
    constructor(repository) {
        this.repository = repository;
    }

    async createMessage(message, user) {
        const newMessage = {
            email: message.email || user.email,
            type: message.type || "user",
            message: message.message ?? message,
        };
        return await this.repository.createMessage(newMessage);
    }

    async getAll() {
        return await this.repository.getAll();
    }

    async getByQuery(query) {
        return await this.repository.getByQuery(query);
    }
}

module.exports = MessageService;