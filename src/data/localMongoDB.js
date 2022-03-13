const { MongoMemoryServer } = require('mongodb-memory-server')

const env = require('../shared/constants')

// src: https://github.com/nodkz/mongodb-memory-server#simple-server-start
const getLocalMongoDAO =  (node_env) => 
    node_env === 'LOCAL' ? MongoMemoryServer.create({dbName: env.ENV}): undefined

const stopInMemoryMongo = (mongod) => mongod ? mongod.stop(): undefined
const getURI = (mongod) => mongod ? mongod.getUri(): undefined

module.exports = {
    getLocalMongoDAO,
    stopInMemoryMongo,
    getURI
}