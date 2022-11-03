const express = require("express");
const { Router } = express;
const AppController = require("../controllers/AppController");
const AppService = require("../services/AppService");

const appRouterFn = () => {
    const appRouter = new Router();
    const appService = new AppService();
    const appController = new AppController(appService);

    //appRouter.get("/serverinfo", (req, res) => appController.getInfo(req,res));
    appRouter.get("/serverinfo", appController.getInfo.bind(appController));

    return appRouter;
};

module.exports = appRouterFn;
