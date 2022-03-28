// Represents connection to mongodb via mongoose
// Mongodb instance can be in-memory mongodb or normal mongodb

const mongoose = require('mongoose')
const logger = require('../shared/logger')

/**
 * Establishes connection to mongodb instance
 * 
 * @param {string} URI URI of mongodb instance
 * @returns {Promise<mongoose>} Promise of mongodb connection
 */
const connect = URI => {
    logger.info('Establishing connection to MongoDB database...');
    return mongoose.connect(URI);
};

/**
 * Closes connection to mongodb instance
 * 
 * @returns {Promise<void>} Promise of mongodb disconnection
 */
const disconnect = () => {
    logger.info('Closing connection to MongoDB database...')
    return mongoose.connection.close()
}

/**
 * Registers event listeners to mongodb connection events
 * 
 * @returns {void}
 */
const connectionStatus = () => {
    mongoose.connection.once('connected', 
        () => logger.info(`Connection to database ${mongoose.connection.name} established!`))

    mongoose.connection.once('error', 
        () => logger.info(`Unable to establish connection to database ${mongoose.connection.name}...`))
}

module.exports = {
    connect,
    disconnect,
    connectionStatus
}