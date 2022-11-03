class OrderDTO {
  constructor(order) {
      this.products = [...order.products];
      this.orderNumber = order.orderNumber;
      this.state = order.state;
      this.userEmail = order.userEmail;
      this.id = order._id || order.id;
      this.date = order.createdAt;
  }
}

module.exports = OrderDTO;
