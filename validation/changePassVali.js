const regex = require('../common/regex')


module.exports = (req, res, next) => {
    if(!req.body.oldPass || !req.body.newPass){
        res.json({
            success: false,
            msg: 'please provide all details'
        })
    }else{
        req.body.newPass = req.body.newPass.trim()

        let newPassCheck = regex.passwordRegex.test(req.body.newPass)

        if(!newPassCheck){
            res.json({
                success: false,
                msg: 'Invalid Password'
            })
        }else{
            next()
        }
    }
}