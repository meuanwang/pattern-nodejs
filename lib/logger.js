let { createLogger, format, transports } = require("winston")


class Logger {
    constructor() {
        this.logger = createLogger({
            level: 'debug',
            format: format.combine(
                format.json(),
                format.colorize(),
                format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
              }),
              format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
            ),
            transports: [new transports.Console()]
        });
    }
    
    error(namespace, content ) {
        this.logger.error(JSON.stringify({ namespace: namespace, content: content }));
    }
    warn(namespace, content ) {
        this.logger.warn(JSON.stringify({ namespace: namespace, content: content }));
    }
    info(content) {
        this.logger.info(content)
    }
}

module.exports = Logger;