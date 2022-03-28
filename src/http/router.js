const express = require('express')
const router = express.Router()

const {quizRouter} = require('../modules/truthyQuiz')
const {devUserRouter} = require('../modules/consumer/http/router')

// Todo: create better health check route
router.get('/', (req, res) => res.status(200).send('Hello World!'))

router.use('/api/quizzes', quizRouter)
router.use('/api/devuser', devUserRouter)

module.exports = router