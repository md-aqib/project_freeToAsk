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
                let questionData = await dbQuestion.findById(req.params.questionId)
                console.log(questionData._id)
                let answerData = await new dbAnswer({
                    question: questionData._id,
                    text: req.body.text,
                    email: loginData.email
                }).save()
                res.json({
                    success: true,
                    ans: answerData
                })
            }catch(err){
                res.json({
                    success: false,
                    msg: 'error in saving answer',
                    err: err
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

