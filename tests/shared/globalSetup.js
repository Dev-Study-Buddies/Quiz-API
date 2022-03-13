const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

const env = require('../../src/shared/constants')

// https://nodkz.github.io/mongodb-memory-server/docs/guides/integration-examples/test-runners
// Clear database contents
module.exports = async function globalSetup(){
    const instance = await MongoMemoryServer.create({dbName: env.ENV})
    const URI = instance.getUri()
    global.__MONGOD__ = instance
    process.env.TEST_URI = URI

    await mongoose.connect(URI, {dbName: "test-db"})
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
}
