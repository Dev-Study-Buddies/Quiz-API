// Represents mgmt of local, in-memory mongodb instance

const {MongoMemoryServer} = require('mongodb-memory-server')

/**
 * 
 * @returns {Promise<MongoMemoryServer>} Create local mongodb instance
 */
const startLocalMongoInstance = () => MongoMemoryServer.create({dbName: 'devDB'})

/**
 * 
 * @param {MongoMemoryServer} localDb Active local mongodb instance
 * @returns {string} URI of the running local mongodb instance
 */
const getLocalMongoURI = localDb => localDb.getUri()

/**
 * 
 * @param {MongoMemoryServer} localDb Active local mongodb instance
 * @returns {Promise<boolean>} cleans up all files used by the instance and stops it
 */
const stopLocalMongoInstance = mongoInstance => mongoInstance.stop()

module.exports = {
    startLocalMongoInstance,
    stopLocalMongoInstance,
    getLocalMongoURI
}
