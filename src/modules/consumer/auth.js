const {hashAPIKey} = require('./key')
const {retrieveByKey, updateUsage} = require('./service')
const config = require('../../shared/constants')
const getTodaysDate = require('../../shared/dateUtils')

const validateAPIKey = (req, res, next) => {
    const key = req.header('x-api-key')
    
    if(key === config.SELF_API_KEY) {
        req.devUser = 'authorized'
        return next()
    }

    const hashKey = hashAPIKey(key)

    const devUser = retrieveByKey(hashKey)

    if(!devUser) return res.status(403).json({message: 'Wrong API key'})
    
    req.devUser = devUser
    return next()
}

const validateUsage = (req, res, next) => {
    const devUser = req.devUser

    if(config.ENV === 'DEV' || req.devUser === 'authorized') next()

    if(!devUser) return res.status(403).json({message: 'User not found'})

    const todaysDate = getTodaysDate()

    if(todaysDate !== devUser.accessDate || devUser.usage < config.API_LIMIT){
        devUser.accessDate = todaysDate
        devUser.usage++
        updateUsage(devUser)
        return next()
    } else {
        return res.status(429).json({message: 'Max API calls exceeded. Try again tomorrow'})
    }
}

module.exports = {
    validateAPIKey,
    validateUsage
}