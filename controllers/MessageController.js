class MessageController {
  constructor(service) {
      this.service = service;
  }

  async postMessage(req, res, next) {
      try {
          let user = {
              email: req.user.email,
          };
          if (req.user.isAdmin) {
              user.type = "system";
          }
          user.type = "user";

          const cart = await this.service.createMessage(req.body.message, user);
          console.log({ cart });

          return res.json(cart);
      } catch (err) {
          return next(err);
      }
  }

  async getAll(req, res, next) {
      try {
          let messages;
          if (req.params.email) {
              messages = await this.service.getByQuery({ email: req.params.email });
              console.log({ messages });
          } else messages = await this.service.getAll();
          return res.json(messages);
      } catch (err) {
          return next(err);
      }
  }
}

module.exports = MessageController;