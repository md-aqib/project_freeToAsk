dbAnswer = require('../../models/answer')
dbLogin = require('../../models/userLogin')
dbQuestion = require('../../models/question')


module.exports = async(req, res) => {
    try{
        let loginData = await dbLogin.findOne({email: req.decoded.email})
        if(!loginData || loginData == null){
            res.json({
                success: false,
                msg: 'something went wrong'
            })
        }else{
            try{
                let answerData = await new dbAnswer({
                    textOne: req.body.textOne,
                    texttwo: req.body.texttwo,
                    name: req.body.name
                }).save()
                res.json({
                    success: true,
                    ans: answerData
                })
            }catch(err){
                res.json({
                    success: false,
                    msg: 'error in saving answer'
                })
            }  
        }
    } catch(err) {
        res.json({
            success: false,
            err: err.message
        })
    }
}

