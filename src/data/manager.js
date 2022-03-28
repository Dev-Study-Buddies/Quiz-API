// Represents mgmt of general mongodb instance to be used by application

const driver = require('./conn')
const localDb = require('./localManager')

let mongod

/**
 * Establishes connection to mongodb instance 
 * 
 * @param {string} URI URI to mongodb
 */
const startDB = async (URI) => {
    if(!URI){
        mongod = await localDb.startLocalMongoInstance()
        URI = localDb.getLocalMongoURI(mongod)
    }

    await driver.connect(URI)
}

/**
 * Stops connection to mongodb instance
 */
const stopDB = async () => {
    await driver.disconnect()
    if(mongod)
        localDb.stopLocalMongoInstance(mongod)
    
    await driver.disconnect()
}

/**
 * Registers connection listeners
 */
const watchDB = () => driver.connectionStatus()

module.exports = {
    startDB,
    stopDB,
    watchDB
}