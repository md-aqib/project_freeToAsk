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
    upvotes: [
        {
            user: {
                type: Schema.Types.ObjectId
            }
        }
    ],
    answers: [
        {
            user: {
                type: Schema.Types.ObjectId,
            },
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

module.exports = mogoose.model('question', question)
