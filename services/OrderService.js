class OrderService {
  constructor(repository) {
      this.repository = repository;
  }

  async createOrder(order) {
      return await this.repository.createOrder(order);
  }

  async getCount() {
      return this.repository.getCount();
  }
}

module.exports = OrderService;