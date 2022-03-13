const mongoose = require('mongoose')
const logger = require('../shared/logger')

const connect = async (URI) => {
    logger.info('Establishing connection to MongoDB database...');
    return mongoose.connect(URI);
};

const disconnect = () => {
    logger.info('Closing connection to MongoDB database...')
    return mongoose.connection.close()
}

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