const UserDTO = require("../dtos/UserDTO");
const userDAOFactory = require("../factories/userDAOFactory");

let instance = null;

class UserRepository {
    constructor() {
        this.dao = userDAOFactory(process.env.STORAGE);
    }

    async getAll() {
        return await this.dao.getItems();
    }

    async getByEmail(email) {
        const user = await this.dao.getByEmail(email);
        console.log(user);
        if (!user) return null;
        const userDTO = new UserDTO(user);
        console.log(userDTO);
        return userDTO;
    }

    async createUser(user) {
        const newUser = await this.dao.createItem(user);
        return newUser;
    }

    async getById(id) {
        console.log({ id });
        return await this.dao.getItemById(id);
    }

    async addCart(userId, cartId) {
        await this.dao.addCart(userId, cartId);
    }

    async deleteCart(cartId) {
        await this.dao.deleteCart(cartId);
    }

    static getInstance() {
        if (instance) {
            return instance;
        }
        instance = new UserRepository();
        return instance;
    }
}

module.exports = UserRepository;
