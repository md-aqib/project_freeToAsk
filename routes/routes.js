const express = require('express')
const router = express.Router()
const tokenVerify = require('../routes/loginRegister/tokenVerify')


// register, login, profile update routes
const register = require('../routes/loginRegister/register')
router.post('/register', register)

const emailVerify = require('../routes/loginRegister/emailVerify')
router.post('/emailVerify', tokenVerify, emailVerify)

const resend = require('../routes/loginRegister/resend')
router.post('/resend', tokenVerify, resend)

const login = require('../routes/loginRegister/loginLogout')
router.post('/login', login.login)

const logout = require('../routes/loginRegister/loginLogout')
router.post('/logout', tokenVerify, logout.logout)

const profile = require('../routes/loginRegister/updateProfile')
router.post('/profile', tokenVerify, profile)

//change and forgot password
router.post('/changepassword', tokenVerify, require('../routes/loginRegister/changeForgot').changePass)
router.post('/forgotpassword', require('../routes/loginRegister/changeForgot').forgotPass)

//Question Answer route
router.post('/question', tokenVerify, require('../routes/QuestionAnswer/question'))




module.exports = router