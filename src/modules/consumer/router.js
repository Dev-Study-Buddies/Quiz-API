const express = require('express')
const router = express.Router()

const devUserController = require('./controller')

router.post('/', devUserController.post)

module.exports = router