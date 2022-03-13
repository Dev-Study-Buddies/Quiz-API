const mongoose = require('mongoose')
const logger = require('../../src/shared/logger')
const env = require('../../src/shared/constants')


const connect = async () => {
    const URI = process.env.TEST_URI
    logger.info(`Here is mongo URI: ${URI}`)
    await mongoose.connect(URI, {dbName: env.ENV})
    logger.info(`connection name: ${mongoose.connection.name}`)
}

const disconnect = async () => await mongoose.connection.close()

module.exports = {
    connect,
    disconnect
}
