class AppController {
    constructor(service) {
        this.service = service;
    }

    async getInfo(_req, res) {
        const data = await this.service.getInfo();
        return res.render("partials/serverData", { data: data });
    }

    async chat(_req, res) {
        return res.render("chat");
    }
}

module.exports = AppController;
