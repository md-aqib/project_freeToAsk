const dbAnswer = require('../../models/answer')
const dbLogin = require('../../models/userLogin')



//upvote and downvote API

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
            try{
                let ansData = await dbAnswer.findById(req.params.answerId)
            console.log(QuestionData)
            if(ansData.upvotes.includes(req.decoded.email)){
                res.json({
                    success: false,
                    msg: 'you have already upvoted'
                })
            }else if(ansData.downvotes.includes(req.decoded.email)){


            }else{
                let data = await dbAnswer.findOneAndUpdate({_id: req.params.answerId}, {$push: {upvotes: req.decoded.email}})
                res.json({
                    success: true,
                    data: data
                })
            }
            }
            catch(err){
                res.json({
                    success: false,
                    err: err
                })
            }
        }
      
    }catch(err){
        res.json({
            success: false,
            msg: 'server error',
            err: err
        })
    }
 
}

exports.downvote = async(req, res) => {
    try{
        let emailData = await dbLogin.findOne(req.decoded.email)
        if(!emailData || emailData == 0){
            res.json({
                success: false,
                msg: 'something went wrong'
            })
        }else{
            try{
                let answer = await dbAnswer.findById(req.params.answerId)
                if(answer.downvotes.includes(req.decoded.email)){
                    res.json({
                        success: false,
                        msg: 'you have already downvoted'
                    })
                }else{
                    try{
                        let data = await dbAnswer.findByIdAndUpdate({_id: req.params.answerId}, {$push: {downvotes: req.decoded.email}})
                        res.json({
                            success: true,
                            data: data
                        })
                    } catch(err){
                        res.json({
                            success: false,
                            err: err
                        })
                    }
                }
            } catch(err){
                res.json({
                    success: false,
                    msg: 'you got some error'
                })
            }
        }
    } 
     catch(err) {
        res.json({
            success: false,
            msg: 'server err',
            err: err
        })
    }
}