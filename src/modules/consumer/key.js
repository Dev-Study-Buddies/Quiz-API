const {createHash} = require('crypto')

const {PropertyValidationError} = require('../../shared/errors')

// src: https://nodejs.org/api/crypto.html#class-hash
const hashKey = key => {
    const hash = createHash('sha256')
    hash.update(key)
    return hash.digest('hex')
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

const validateKey = key => {
    // /^([a-z\d]){30}$/gm

    const keyRegex = /^([a-z\d]){30}$/gm
    if(!key || key.length !== 30 || !keyRegex.test(key))
        throw new PropertyValidationError('key', 'API Key fails validiation tests')

    return key
}

module.exports = {
    hashKey,
    genKey,
    validateKey
}