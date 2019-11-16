const regex = require('../strategies/regex')


module.exports = (req, res, next) => {
    if(!req.body.email || !req.body.password || !req.body.userName || !req.body.phone || !req.body.name){
        res.json({
            success: false,
            msg: 'please provide all details'
        })
    }else{
        req.body.email = req.body.email.trim()
        req.body.password = req.body.password.trim()
        req.body.userName = req.body.userName.trim()
        req.body.phone = req.body.phone.trim()
        req.body.name = req.body.name.trim()


        let emailCheck = regex.emailRegex.test(req.body.email)
        let passCheck = regex.passwordRegex.test(req.body.password)
        let phoneCheck = regex.phoneRegex.test(req.body.phone)

        let unmatched = []
        
        if(!emailCheck){
            unmatched.push('Email')
        }
        if(!passCheck){
            unmatched.push('Password')
        }
        if(!phoneCheck){
            unmatched.push('Phone')
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