const ConsumerDAO = require('./dao')
const Consumer = require('./model')
const {genKey, hashKey} = require('./key')
const {MissingPropError} = require('../../shared/errors')

/**
 * 
 * @returns Array of all API consumers; Null if none
 */
const getAll = async () => {
    const consumers = await ConsumerDAO.getAll()

    return consumers.length === 0 ? null: consumers
}

const getById = async (id) => {
    if(!id) throw new MissingPropError('Consumer ID')

    const consumer = await ConsumerDAO.getById(id)

    return !consumer ? null: consumer
}

const getByKey = async (key) => {
    if(!key) throw new MissingPropError('Hashed API key')

    const consumer = await ConsumerDAO.getByKey(key)

    return !consumer ? null: consumer
}

const getByEmail = async (email) => {
    if(!email) throw new MissingPropError('Consumer Email')

    const consumer = await ConsumerDAO.getByEmail(email)

    return !consumer ? null: consumer
}

const create = async (email) => {

    const apiKey = genKey()

    const consumer = new Consumer(apiKey, email)

    // save consumer into database
    const consumerDoc = await ConsumerDAO.create(consumer)
    
    return !consumerDoc ? null : apiKey
}


const incrementUsage = async (key) => {
    
    if(!key) throw new MissingPropError('Hashed API key')
    const consumer = await ConsumerDAO.getByKey(key)

    consumer.usage = consumer.usage + 1

    const updatedConsumer = await ConsumerDAO.updateById(consumer.id, consumer)

    return !updatedConsumer ? null: updatedConsumer
}

const updateKey = async (key) => {

    if(!key) throw new MissingPropError('Hashed API key')
    const consumer = await ConsumerDAO.getByKey(key)

    const newKey = genKey()
    consumer.key = hashKey(newKey)
    
    const updatedConsumer = await ConsumerDAO.updateById(consumer.id, consumer)

    return !updatedConsumer ? null: newKey
}

const removeById = async (id) => {
    if(!id) throw new MissingPropError('Consumer ID')

    return await ConsumerDAO.removeById(id)
}


module.exports = {
    getAll,
    getById,
    getByKey,
    getByEmail,
    create,
    incrementUsage,
    updateKey,
    removeById,
}