const quizName = 'Sample Quiz name'
const quizQuestions = [
    {
        text: "Question #1",
        answer: true
    },
    {
        text: "Question #2",
        answer: false
    },
    {
        text: "Question #3",
        answer: false
    },
    {
        text: "Question #4",
        answer: true
    },
]

const singleTruthyQuizJSON = {
    name: 'Test Quiz name',
    questions: [
        {
            text: "STQJ Question #1",
            answer: true
        },
        {
            text: "STQJ Question #2",
            answer: false
        },
        {
            text: "STQJ Question #3",
            answer: false
        },
        {
            text: "STQJ Question #4",
            answer: true
        },
    ]
}


const manyTruthyQuizJSON = [
    {
        name: "Test Quiz 1",
        questions: [
            {
                text: "MTQJ Question #1",
                answer: true
            },
            {
                text: "MTQJ Question #2",
                answer: false
            },
            {
                text: "MTQJ Question #3",
                answer: false
            },
            {
                text: "MTQJ Question #4",
                answer: true
            },
        ]
    },
    {
        name: "Test Quiz 2",
        questions: [
            {
                text: "MTQJ Question #1",
                answer: true
            },
            {
                text: "MTQJ Question #2",
                answer: false
            },
            {
                text: "MTQJ Question #3",
                answer: false
            },
            {
                text: "MTQJ Question #4",
                answer: true
            },
        ]
    },
    {
        name: "Test Quiz 3",
        questions: [
            {
                text: "MTQJ Question #1",
                answer: true
            },
            {
                text: "MTQJ Question #2",
                answer: false
            },
            {
                text: "MTQJ Question #3",
                answer: false
            },
            {
                text: "MTQJ Question #4",
                answer: true
            },
        ]
    },
]

const sampleDevuser = {
    apiKey: '123',
    email: 'test@email.com',
}

module.exports = {
    singleTruthyQuizJSON,
    manyTruthyQuizJSON,
    quizName,
    quizQuestions,
    sampleDevuser
}