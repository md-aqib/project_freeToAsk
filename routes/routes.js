const express = require('express')
const router = express.Router()
const tokenVerify = require('./tokenVerify')


// register, login, profile update routes
const register = require('./register')
router.post('/register', register)

const emailVerify = require('./emailVerify')
router.post('/emailVerify', tokenVerify, emailVerify)

const resend = require('./resend')
router.post('/resend', tokenVerify, resend)

const login = require('./loginLogout')
router.post('/login', login.login)

const logout = require('./loginLogout')
router.post('/logout', tokenVerify, logout.logout)

const profile = require('./updateProfile')
router.post('/profile', tokenVerify, profile)

//change and forgot password
router.post('/changepassword', tokenVerify, require('./changeForgotPass').changePass)
router.post('/forgotpassword', require('./changeForgotPass').forgotPass)




module.exports = router