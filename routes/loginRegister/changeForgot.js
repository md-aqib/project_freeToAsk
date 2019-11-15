const dbRegister = require('../../models/register')
const dbLogin = require('../../models/userLogin')
const mailer = require('../emailSmsModule/nodemailer')
const bcrypt = require('bcrypt')
const saltRound = 8


// //change password API
exports.changePass = (req, res) => {
    if(!req.body.newPass || !req.body.oldPass){
        res.json({
            success: false,
            msg: 'Please provide all details'
        })
    }else{
        dbRegister.findOne({email: req.decoded.email})
        .then(data => {
            
            if(data.password == req.body.oldPass){
                dbLogin.findOneAndUpdate({email: req.decoded.email}, {$set: {'password': req.body.newPass }})
                .then(updatedData => {
                    console.log(updatedData)
                    res.json({
                        success: true,
                        msg: 'new password updated'
                    })
                })
                .catch(err => {
                    res.json({
                        success: false,
                        msg: 'error in update'
                    })
                })
            }else{
                res.json({
                    success: false,
                    msg: 'incorrect Old password'
                })
            }
        })
        .catch(err => {
            res.json({
                success: false,
                msg: 'Something went wrong',
                err: err
            })
        })
    }
}



// Generate new password
const generatePass = async() =>{
    let newPassword = await 'abcd' + Math.floor(Math.random()*10000)
    return newPassword
}






//forgot password API
exports.forgotPass = (req, res) => {
    if(!req.body.email){
        res.json({
            success: false,
            msg: 'Please Enter Your Email.'
        })
    }else{
            dbRegister.findOne({email: req.body.email})
            .then(emailData => {
                if(!emailData || emailData == null){
                    res.json({
                        success: false,
                        msg: 'User not registered'
                    })
                }else{
                    generatePass()
                    .then(generatedPass => {
                        //hash password
                        const hashPass = async() => {
                            let hash = await bcrypt.hash(generatedPass, saltRound)
                            return hash
                        }
                        hashPass()
                            .then(hashed => {
                                dbLogin.findOneAndUpdate({email: req.body.email}, {$set: {'password': hashed}})
                                .then(update => {
                                    if(update){
                                        dbLogin.findOne({email: req.body.email})
                                        .then(updated => {
                                            mailer.sendMails(req.body.email, 'Your New Password is:', generatedPass)
                                                res.json({
                                                    success: true,
                                                    msg: 'New Password Sent to your email'
                                                })
                                        })
                                        .catch()
                                        
                                    }else{
                                        res.json({
                                            success: false,
                                            msg: 'new password not updated'
                                        })
                                    }
                                })
                                .catch(err => console.log(err))
                            })
                            .catch(err => console.log(err))

                    })
                    .catch(err => console.log(err))
                        
                    }
            })
            .catch(err => console.log(err))
                
    }
}