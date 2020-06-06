const express   = require("express");
const Server    = require("./lib/server");
const Logger    = require("./lib/logger") ;

let logger = new Logger();
let server = new Server(express,logger);

server.initApp();
server.initRoutes();
server.initDatabase();
server.run();