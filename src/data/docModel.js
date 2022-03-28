// Factory for Mongoose Models

const mongoose = require('mongoose')

const jsonTransformer = {
    transform: (doc, result) => {
        result.id = result._id.toString()
        delete result._id
        delete result.__v
    }
} 

/**
 * Generates mongoose Model 
 * 
 * @param {string} name Name for document entity
 * @param {mongoose.Schema} schemaPaths 
 * @returns {mongoose.Model} Entity Model for DB operations
 */
const documentModelFactory = (name, schemaPaths) => {
    const schema = new mongoose.Schema(schemaPaths)

    schema.set('toJSON', jsonTransformer)

    return mongoose.model(name, schema)
}

module.exports = documentModelFactory