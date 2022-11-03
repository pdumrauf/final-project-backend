class UserDTO {
  constructor(user) {
      this.name = user.name;
      this.email = user.email;
      this.phone = user.phone;
      this.password = user.password;
      this.cart_id = user.cart_id;
      this.id = user._id || user.id;
  }
}

module.exports = UserDTO;