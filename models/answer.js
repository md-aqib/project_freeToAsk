const mongoose = require('mongoose')
const Schema = mongoose.Schema

answer = new Schema({
    answers: {
        // question: {
        //     type: Schema.Types.ObjectId,
        //     ref: 'questions'
        // },
        textone:{
            type: String,
            required: true
            },
        texttwo:{
            type: String,
            required: true
            },    
        name:{
                type: String
            }
        },
    upvotes: [String],
    downvotes: [String],
    date: {
        type: Date,
        default: new Date
        }
})

module.exports = mongoose.model('answer', answer)