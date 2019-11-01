const mongoose = require('mongoose')
const Schema = mongoose.Schema

const question = new Schema({

    textone: {
        type: String,
        required: true
    },
    texttwo: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    upvotes: [String],
    answers: [
        {
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            date: {
                type: Date,
                default: new Date
            }
        }
    ]
})

module.exports = mongoose.model('question', question)
