const express = require('express')
const router = express.Router()
const quizController = require('./controller')

router.get('/', quizController.getAll)
router.get('/:id', quizController.getById)
router.post('/', quizController.post)
router.put('/:id', quizController.put)
router.delete('/:id', quizController.remove)

module.exports = router