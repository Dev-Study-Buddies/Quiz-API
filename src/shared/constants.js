require('dotenv').config()
const os = require('os')

const PORT = process.env.PORT || 8000
const MONGO_URI = process.env.MONGO_URI || ''
const HOSTNAME = process.env.HOSTNAME || os.hostname()
const ENV = process.env.NODE_ENV || 'DEV'
const SELF_API_KEY = process.env.SELF_API_KEY || ''

const API_LIMIT = process.env.API_LIMIT || 1

module.exports = {
    PORT,
    MONGO_URI,
    HOSTNAME,
    ENV,
    SELF_API_KEY,
    API_LIMIT
}