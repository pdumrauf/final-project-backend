const OrderDTO = require("../dtos/OrderDTO");
const orderDAOFactory = require("../factories/orderDAOFactory");

let instance = null;

class OrderRepository {
    constructor() {
        this.dao = orderDAOFactory(process.env.STORAGE);
    }

    async createOrder(order) {
        try {
            const orderDB = await this.dao.createItem(order);
            const orderDTO = new OrderDTO(orderDB);
            return orderDTO;
        } catch (err) {
            throw err;
        }
    }

    async getCount() {
        return await this.dao.getCount();
    }

    static getInstance() {
        if (instance) {
            return instance;
        }
        instance = new OrderRepository();
        return instance;
    }
}

module.exports = OrderRepository;
