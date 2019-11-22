const mongoose = require('mongoose')
const Schema = mongoose.Schema


/**
 * Status
 * 0: User registered
 * 1: email verified
 * 2: Profile created
 * 3: Profile Updated
 **/


const profile = new Schema({
    userName: String,
    bio: String,
    name: String,
    email: String,
    profilePic: String,
    userType: {
        type: String,
        enum: ['student', 'working'],
        trim: true
    },
    portfolio: [String],
    createdAt: Date,
    updatedAt: [Date],
    status: Number,
})

module.exports = mongoose.model('profile', profile)