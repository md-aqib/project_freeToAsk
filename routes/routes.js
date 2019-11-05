const express = require('express')
const router = express.Router()
const tokenVerify = require('../routes/loginRegister/tokenVerify')


// register, login, profile update route
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
router.post('/profileUpdate', tokenVerify, profile)

const profileData = require('./loginRegister/profileData')
router.post('/profileData', tokenVerify, profileData)

//change and forgot password route
router.post('/changepassword', tokenVerify, require('../routes/loginRegister/changeForgot').changePass)
router.post('/forgotpassword', require('../routes/loginRegister/changeForgot').forgotPass)

//Question Answer Upvote Downvote route
router.post('/question', tokenVerify, require('../routes/QuestionAnswer/question'))
router.post('/answer/:questionId', tokenVerify, require('../routes/QuestionAnswer/answer'))

router.post('/upvotes/:answerId', tokenVerify, require('../routes/QuestionAnswer/upDownvotes').upvote)
router.post('/downvotes/:answerId', tokenVerify, require('../routes/QuestionAnswer/upDownvotes').downvote)

//Get API
router.post('/getQuestions',tokenVerify, require('./QuestionAnswer/getAllQuestions'))
router.post('/getAnsById/:questionId', tokenVerify, require('./QuestionAnswer/ansbyquesId'))




module.exports = router