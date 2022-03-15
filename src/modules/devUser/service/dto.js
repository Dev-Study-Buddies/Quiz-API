const {createHash} = require('crypto')

const ValidationError = require('../../../shared/errors/Validation.error')

// src: https://nodejs.org/api/crypto.html#class-hash
const hashAPIKey = key => {
    const hash = createHash('sha256')
    hash.update(key)
    return hash.digest('hex')
}

module.exports = ({apiKey, email}) => {
    if(apiKey && email)
        return {key: hashAPIKey(apiKey), email}
    else
        throw new ValidationError('Dev User')
}