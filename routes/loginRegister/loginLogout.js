const dbLogin = require('../../models/userLogin')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')




exports.login = (req, res) => {
    if(!req.body.email || !req.body.password){
        res.json({
            success: false,
            msg: 'please enter both email and password'
        })
        }else {
            dbLogin.findOne({$or: [{email: req.body.email}, {phone: req.body.phone}, {userName: req.body.userName}]})
            .then(data => {
            console.log(data)
                if(!data || data == null){
                    res.json({
                        success: false,
                        msg: 'user not registered yet'
                    })
                }else{
                    bcrypt.compare(req.body.password, data.password)
                    .then((matched) => {
                        if(matched){
                            var tokenData = {
                                email: data.email,
                                phone: data.phone
                            }
                        var token = jwt.sign(tokenData, req.app.get('secretKey'), { expiresIn: '1h' });
                        dbLogin.findOneAndUpdate({ email: req.body.email }, { $push: { lastLogin: new Date() }, $set: { token: token }})
                        .then(loginData => {
                            console.log(loginData)
                            res.json({
                                success: true,
                                msg: "Login Successfull",
                                status: loginData.status,
                                token: token
                            })
                        })
                        .catch(err =>{
                            res.json({
                                success: false,
                                msg: 'Error in login, Try again',
                                err: err
                            })
                        })
                        }else{
                            res.json({
                                success: false,
                                msg: 'incorrect password'
                            })
                        }
                    })
                    .catch(err => console.log(err))
                }     
    })
    .catch(err => {
        res.json({
            success: false,
            msg: 'Server Error',
            err: err
        })
    })
}
}



exports.logout = (req, res) =>{
    dbLogin.findOneAndUpdate({ email: req.body.email}, {$set: {token: null}})
    .then(loggedout => {
        res.json({
            success: true,
            msg: 'logged out'
        })
    })
    .catch(err => {
        res.json({
            success: false,
            msg: 'Something went wrong',
            err: err
        })
    })
}
