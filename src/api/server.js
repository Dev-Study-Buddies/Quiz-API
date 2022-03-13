const logger = require('../shared/logger')
const app = require('./app')

const connect = (port, hostname) => {

    const displayInfo = (addressInfo) => {
        logger.info(`Server is running on ${hostname}`);
        let connectionInfo;
        if(typeof addressInfo === 'object'){
            connectionInfo = `Port: ${addressInfo.port}`;
			
            logger.info(connectionInfo);
        }
    }

    const serverCallback = (resolve, reject) => {
        const http = app.listen(port, () => displayInfo(http.address()))
            .on('listening', () => resolve(http))
            .on('error', err => reject(err))
    }

    return new Promise((resolve, reject) => serverCallback(resolve, reject))
}

const disconnect = (server) => {
    return new Promise((resolve, reject) => server
        .close(() => logger.info('HTTP server closed!'))
        .on('close', () => resolve())
        .on('error', () => reject(new Error("HTTP Server doesn't exist!")))
    )
}

module.exports = {
    connect,
    disconnect
}