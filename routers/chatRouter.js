const express = require("express");
const { Router } = express;
const passport = require("passport");

const MessageRepository = require("../repositories/MessageRepository");
const MessageService = require("../services/MessageService");
const MessageController = require("../controllers/MessageController");

const chatRouterFn = () => {
    const chatRouter = Router();
    const messageRepository = MessageRepository.getInstance();
    const messageService = new MessageService(messageRepository);
    const messageController = new MessageController(messageService);

    chatRouter.get("/:email?", passport.authenticate("jwt"), messageController.getAll.bind(messageController));

    chatRouter.post("/", passport.authenticate("jwt"), messageController.postMessage.bind(messageController));

    return chatRouter;
};

// cartRouter.post("/:id", cartController.generateOrder);

module.exports = chatRouterFn;