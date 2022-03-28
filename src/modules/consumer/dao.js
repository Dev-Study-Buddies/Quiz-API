const {Schema} = require('mongoose')
const { documentModelFactory } = require('../../data')

const consumerSchema = {
    key: Schema.Types.String,
    // todo: analyze whether email should be unique or not
    email: {
        type: Schema.Types.String,
        unique:true
    },
    accessDate: Schema.Types.Date,
    usage: Schema.Types.Number
}

const Consumer = documentModelFactory('Consumer', consumerSchema)

module.exports = {
    async getAll(){

        const toJSON = rs => rs.map(r => r.toJSON())
        const transformResultSet = rs => rs.length === 0 ? []:toJSON(rs)

        return await Consumer
            .find({})
            .transform(transformResultSet)
            .exec()
    },
    async getById(id){
        return await Consumer
            .findById(id)
            .transform(c => c.toJSON())
            .exec()
    },
    async getByKey(key){
        return await Consumer
            .findOne({key})
            .transform(c => c.toJSON())
            .exec()
    },
    async getByEmail(email){
        return await Consumer
            .findOne({email})
            .transform(c => c.toJSON())
            .exec()
    },
    // saves Consumer to MongoDB database and returns Document object
    async create(payload){
        return (await Consumer.create(payload))
            .toJSON()
    },
    async updateById(id, payload){
        return (await Consumer
            .findByIdAndUpdate(id, payload, {new:true}))
            .toJSON()
    },
    async removeById(id){
        return await Consumer.findByIdAndRemove(id)
    }
}