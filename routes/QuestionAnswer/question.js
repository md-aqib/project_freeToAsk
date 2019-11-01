const dbQuestion = require('../../models/question')
const dbLogin = require('../../models/userLogin')



exports.question = (req, res) => {
    dbLogin.findOne({email: req.decoded.email})
    .then(loginData => {
        console.log(loginData)
        new dbQuestion({
            user: loginData._id,
            email: req.decoded.email,
            textone: req.body.textone,
            texttwo: req.body.texttwo,
            name: req.body.name
        })
        .save()
        .then(questionData => {
            res.json({
                success: true,
                msg: 'question updated',
                questions: questionData

            })
        })
        .catch(err => {
            res.json({
                success: false,
                msg: 'error in update question'
            })
        })
    })
    .catch(err => {
        res.json({
            success: false,
            msg: ''
        })
    })
}


exports.upvote = async(req, res) => {
    try{
        let emailData = await dbLogin.findOne({email: req.decoded.email})
        console.log(typeof(req.decoded.email))
        if(!emailData || emailData == null){
            res.json({
                success: false,
                msg: 'something went wrong'
            })
        }else{
            let QuestionData = await dbQuestion.findById(req.params.id)
            console.log(QuestionData)
            if(QuestionData.upvotes.includes(req.decoded.email)){
                res.json({
                    success: false,
                    msg: 'you are already upvoted'
                })
            }else{
                let data = await dbQuestion.findOneAndUpdate({_id: req.params.id}, {$push: {upvotes: req.decoded.email}})
                res.json({
                    success: true,
                    data: data
                })
            }
        }
      
    }catch(err){
        console.log(err)
    }
 
}
