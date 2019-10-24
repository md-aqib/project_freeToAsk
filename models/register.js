const mongoose = require('mongoose')
const Schema = mongoose.Schema


/**
 * Status
 * 0: User registered
 * 1: email verified
 * 2: phone verified
 * 3: Profile created
 * 4: Profile updated
 **/


const register = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type : String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    phoneVerify: {
        otp: Number,
        verified: Boolean,
        verifiedAt: Date
    },
    emailVerify: {
        otp: Number,
        verified: Boolean,
        verifiedAt: Date
    },
    status: Number,
    createdAt: {
        type: Date,
        default: new Date()

    }
})

module.exports = mongoose.model('register', register)