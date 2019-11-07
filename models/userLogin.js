const mongoose = require('mongoose')
const Schema = mongoose.Schema


/**
 * Status
 * 0: User registered
 * 1: email verified
 * 2: Profile created
 * 3: Profile updated
 **/


const userLogin = new Schema({
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
    emailVereify: {
        otp: Number,
        Verified: Boolean,
        verifiedAt: Date
    },
    status: Number,
    lastLogin: [Date],
    token: String,
    createdAt: {
        type: Date,
        default: new Date()

    }

})




// const saltRounds = 10;


// bcrypt.hash(password, saltRounds).then(function(hash) {
//     // Store hash in your password DB.
// });

// bcrypt.compare(password, hash).then(function(res) {
//     // res == true
// });

module.exports = mongoose.model('userLogin', userLogin)