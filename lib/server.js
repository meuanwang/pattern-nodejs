"use strict";
const mongoose  = require('mongoose');
const cors      = require('cors')


mongoose.Promise = global.Promise
class Server {
    constructor(express,log) {
        this.express    = express;
        this.app        = this.express();
        this.logger     = log
        this.db         = mongoose   
        this.bodyParser = require('body-parser')
    }
    initApp(){
        this.app.use(cors({
            "origin": "*",
            "methods": "GET,HEAD,PUT,PATCH,POST,DELETE"
        }))
        this.app.use(this.bodyParser.urlencoded({ extended: true }));
        this.app.use(this.bodyParser.json());
    }
    initRoutes() {
        let routes = require("../route/index");
        this.app.use(routes);
        return true;
    }
    initDatabase(){
        let dbconnect = `mongodb://127.0.0.1:27017/exam`
        this.db.connect(dbconnect)
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