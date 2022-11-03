const numCPUs = require("os").cpus().length;

class AppService {
    constructor() {}
    async getInfo() {
        const data = {
            os: process.platform,
            nodeVersion: process.version,
            path: process.execPath,
            processId: process.pid,
            folderPath: process.cwd(),
            maxRSS: process.resourceUsage().maxRSS + " bytes",
            numCPUs,
            port: process.env.PORT,
            adminEmail: process.env.ADMIN_EMAIL,
            databaseURL: process.env.MONGODB_URI,
            expirationTime: process.env.TOKEN_EXP,
        };
        return data;
    }
}

module.exports = AppService;