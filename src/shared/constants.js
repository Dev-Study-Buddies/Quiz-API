require('dotenv').config()
const os = require('os')

const PORT = process.env.PORT || 8000
const MONGO_URI = process.env.MONGO_URI || ''
const HOSTNAME = process.env.HOSTNAME || os.hostname()
const ENV = process.env.NODE_ENV || 'DEV'

module.exports = {
    PORT,
    MONGO_URI,
    HOSTNAME,
    ENV
}