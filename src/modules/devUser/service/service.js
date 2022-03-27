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
        apiKey: payload.apiKey,
        email: payload.email,
    }

    const devuserJSON = mapToJSON(devuserDTO)
    const devuserDB = new DevUser(devuserJSON)
    const savedDevuser = await devuserDB.save()

    return savedDevuser.toJSON()
}

//src: https://github.com/prof3ssorSt3v3/how-to-api/blob/89e65d692f815ff2b79d5ac76d7010f0506632c5/server/middleware/apikeys.js#L4
const genKey = () => {
    const key = []

    for(let i = 0; i<30; i++){
        // bitwise or operation rounds math.random() to 1 or 0
        // see: https://stackoverflow.com/a/48265911
        const randomInt = Math.random() * 36 | 0
        // Base36 radix for representing values a-z0-9
        const randomChar = randomInt.toString(36)

        key.push(randomChar)
    }

    // ex: 'an0qrr5i9u0q4km27hv2hue3ywx3uu'
    return key.join('')
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
    update,
    genKey,
}