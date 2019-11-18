const regex = require('../common/regex')


module.exports = (req, res, next) => {
    if(!req.body.email || !req.body.password){
        res.json({
            success: false,
            msg: 'please provide all details'
        })
    }else{
        req.body.email = req.body.email.trim()
        req.body.password = req.body.password.trim()

        let eamailCheck = regex.emailRegex.test(req.body.email)
        let passwordCheck  = regex.passwordRegex.test(req.body.password)

        let unmatched = []
        if(!eamailCheck){
            unmatched.push('Email')
        }
        if(!passwordCheck){
            unmatched.push('Password')
        }

        let msg = unmatched.length == 1 ? ' is invalid' : ' are invalid'
        if(unmatched.length > 0){
            res.json({
                success: false,
                msg: unmatched.join(',') + msg
            })
        }else{
            next()
        }
    }
}