const express = require('express')
const router = express.Router()

const {quizRouter} = require('../modules/truthyQuiz')

router.get('/', (req, res) => res.status(200).send('Hello World!'))

router.use('/api/quizzes', quizRouter)

module.exports = router