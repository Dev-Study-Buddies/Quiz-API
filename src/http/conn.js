// Represents HTTP server connection

const logger = require('../shared/logger')
const app = require('./app')

/**
 * 
 * @param {string} port port HTTP server should be listening to
 * @param {string} hostname name of the device running this application
 * @returns {Promise<net.Server>} Promise of HTTP connection
 */
const connect = (port, hostname) => {


    /**
     * Logs HTTP connection info
     * 
     * @param {{port: number, family: string, address: string}} addressInfo http.address()
     */
    const displayServerInfo = httpAddressInfo => {
        // TODO: modify hostname to reflect which VPS the app is running on
        logger.info(`Server is running on ${hostname}`)
        // https://nodejs.org/api/net.html#serveraddress
        if(typeof httpAddressInfo === 'object')
            logger.info(`Port: ${httpAddressInfo.port}`)
    }

    /**
     * Starts up HTTP server
     * 
     * @param {(value:any)} resolve 
     * @param {(reason?:any)} reject 
     */
    const serverCallback = (resolve, reject) => {
        const http = app.listen(port, () => displayServerInfo(http.address()))
            .on('listening', () => resolve(http))
            .on('error', err => reject(err))
    }

    return new Promise((resolve, reject) => serverCallback(resolve, reject))
}

/**
 * Closes HTTP server
 * 
 * @param {net.Server} server 
 * @returns {Promise<void>} 
 */
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