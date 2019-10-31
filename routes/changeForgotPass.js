const dbRegister = require('../models/register')
const dbLogin = require('../models/userLogin')
const mailer = require('./emailSmsModule/nodemailer')

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

exports.forgotPass = async(req, res) => {
    if(!req.body.email){
        res.json({
            success: false,
            msg: 'Please Enter Your Email.'
        })
    }else{
       try {
            let emailData = await dbRegister.findOne({email: req.body.email});
                if(!emailData || emailData == null){
                    res.json({
                        success: false,
                        msg: 'User not registered'
                    })
                }else{
                    let updated = await dbLogin.findOneAndUpdate({email: req.body.email}, {$set: {'password': 'aqib123'}});
                    console.log(updated)
                    mailer.sendMails(req.body.email, `Your New Password is:`, updated.password)
                        res.json({
                            success: true,
                            msg: 'New Password Updated'
                        })
                    }
        }catch (err) {
            res.json({
                success: false,
                msg: 'server errror',
                err: err
            })
       }
    }
}