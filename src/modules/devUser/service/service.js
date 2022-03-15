const DevUser = require('../data/schema')
const mapToJSON = require('./dto')

const retrieveAll = async () => {
    const devUsers = await DevUser.find({}).exec()

    if(devUsers.length === 0) return null

    return devUsers.map(d => d.toJSON())
}

const retrieveByID = async (id) => {
    if(!id) throw new Error('ID not provided')

    const result = await DevUser.findById(id).exec()

    return result ? result.toJSON() : null
}

const create = async payload => {
    const devuserDTO = {
        apiKey : payload.apiKey,
        email: payload.email,
    }

    const devuserJSON = mapToJSON(devuserDTO)
    const devuserDB = new DevUser(devuserJSON)
    const savedDevuser = await devuserDB.save()

    return savedDevuser.toJSON()
}

const remove = async id => await DevUser.findByIdAndRemove(id)

const update = async (id, payload) => {
    const devuserJSON = mapToJSON(payload)
    return (await DevUser.findByIdAndUpdate(id, devuserJSON, {new:true})).toJSON()
}

module.exports = {
    retrieveAll,
    retrieveByID,
    create,
    remove,
    update
}