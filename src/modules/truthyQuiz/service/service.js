const Quiz = require('../data/schema')
const mapToDTO = require('./dto')

const retrieveAll = async () => {

    // https://mongoosejs.com/docs/promises.html#should-you-use-exec-with-await
    const quizzes = await Quiz.find({}).exec()

    if(quizzes.length === 0) return null

    // See quizSchema.set('toJSON) in truthyQuiz/schema.js
    return quizzes.map(q => q.toJSON())
}

const retrieveByID = async (id) => {

    if(!id) throw new Error('ID not provided!')

    const result = await Quiz.findById(id).exec()

    // according to the docs, findById returns null if not found
    // I explicitly return null here to make it clear that null will be returned
    return result ? result.toJSON() : null
}

const create = async (payload) => {
    
    const quizJSON = mapToDTO(payload.name, payload.questions)
    const quizDb = new Quiz({name: quizJSON.name, questions: [...quizJSON.questions]})        
    const savedQuiz = await quizDb.save()

    return savedQuiz.toJSON()
}

const remove = async (id) => await Quiz.findByIdAndRemove(id)

const update = async (id, payload) => {
    
    const quizJSON = mapToDTO(payload.name, payload.questions)

    return (await Quiz.findByIdAndUpdate(id, quizJSON, {new: true})).toJSON()
}

module.exports = {
    retrieveAll,
    retrieveByID,
    create,
    remove,
    update
}