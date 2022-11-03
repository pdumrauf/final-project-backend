const express = require("express");
const { Router } = express;

const UserRepository = require("../repositories/UserRepository");
const UserService = require("../services/UserService");
const AuthController = require("../controllers/AuthController");

const authRouterFn = () => {
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    const authController = new AuthController(userService);
    const authRouter = new Router();

    authRouter.post("/signup", authController.signUp.bind(authController));
    authRouter.post("/signin", authController.signIn.bind(authController));

    return authRouter;
};

module.exports = authRouterFn;