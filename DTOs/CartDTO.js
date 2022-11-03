class CartDTO {
  constructor(cart) {
      this.user_id = cart.user_id;
      this.products = [...cart.products];
      this.id = cart._id || cart.id;
  }
}

module.exports = CartDTO;
