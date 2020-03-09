"use strict";

class Server {
    constructor(express,log) {
        this.express = express;
        this.app = this.express();
        this.logger = log
    }
    
    initRoutes() {
        let routes = require("../route");
        this.app.use(routes);
        return true;
    }

    run() {
        this.app.listen(3000,()=>{
            this.logger.info("====================");
            this.logger.info("server.start.success");
            this.logger.info("port : 3000")
            this.logger.info("====================");
        });
    }
}

module.exports = Server;