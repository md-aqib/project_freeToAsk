const dbLogin = require('../models/userLogin')
const dbRegister = require('../models/register')
var jwt = require('jsonwebtoken')

//generate otp
var generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
}

exports.login = (req, res) =>{
    dbRegister.find({$or: [{email: req.body.email}, {phone: req.body.phone}, {userName: req.body.userName}]})
    .then(data => {
        if(!data || data == null){
            res.json({
                success: false,
                msg: 'user not registered yet'
            })
        }else if(req.body.password == data.password){
            var tokenData = {};
                dbProfile.findOne({ email: req.body.email })
                .then(loginData => {
                    tokenData = {
                        _id: loginData._id,
                        Name: loginData.name,
                        email: loginData.email,
                        phone: loginData.phone,
                    }
                })
                .catch(err => console.log(err))
            var token = jwt.sign(tokenData, req.app.get('secretKey'));
            dbLogin.findOneAndUpdate({ email: req.body.email }, { $push: { lastLogin: new Date() }, $set: { token: token } })
                .then(loginData => {
                    res.json({
                        success: true,
                        msg: "Login Successfull",
                        status: loginData.status,
                        token: token,
                        changePassword: loginData.changePassword || false
                    })
                })
                .catch(err => console.log(err))
        }
    })
    .catch(err => console.log(err))
}


exports.logout = (req, res) =>{
    dbLogin.findOneAndUpdate({ email: req.body.email}, {$set: {token: null}})
    .then(loggedout => {
        res.json({
            success: true,
            msg: 'logged out'
        })
    })
    .catch(err => console.log(err))
}
