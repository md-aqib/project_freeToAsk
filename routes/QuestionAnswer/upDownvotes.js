const dbAnswer = require('../../models/answer')
const dbLogin = require('../../models/userLogin')



//upvote API
exports.upvote = async(req, res, next) => {
    try{
        let emailData = await dbLogin.findOne({email: req.decoded.email})
        if(!emailData || emailData == null){
            res.json({
                success: false,
                msg: 'something went wrong'
            })
        }else{
            try{
                let ansData = await dbAnswer.findById(req.params.answerId)
                if(!ansData || ansData == null){
                    res.json({
                        success: false,
                        msg: 'Answer not found'
                    })
                }else{
                    if(ansData.downvotes.includes(req.decoded.email)){
                        let deleteDownvote = await dbAnswer.findOneAndUpdate({downvotes: req.decoded.email}, {$pull: {downvotes: req.decoded.email}})
                        if(deleteDownvote){
                            let updateUpvote = await dbAnswer.findOneAndUpdate({_id: req.params.answerId}, { $addToSet: { upvotes: req.decoded.email} })
                            res.json({
                                success: true,
                                msg: 'upvote updated'
                            })
                        }else{
                            res.json({
                                success: false,
                                
                            })
                        }
                    }else{
                        let updateUpvote = await dbAnswer.findOneAndUpdate({_id: req.params.answerId}, { $addToSet: { upvotes: req.decoded.email} })
                            res.json({
                                success: true,
                                msg: 'upvoted'
                            })
                    }
                }
            } catch(err){
                next(err)
            }
        }
      
    }catch(err){
        next(err)
    }
 
}


//downvote API
exports.downvote = async(req, res) => {
    try{
        let emailData = await dbLogin.findOne({email: req.decoded.email})
        if(!emailData || emailData == 0){
            res.json({
                success: false,
                msg: 'something went wrong'
            })
        }else{
            try{
                let ansData = await dbAnswer.findById(req.params.answerId)
                if(!ansData || ansData == null){
                    res.json({
                        success: false,
                        msg: 'Answer not found'
                    })
                }else{
                    if(ansData.upvotes.includes(req.decoded.email)){
                        let deleteUpvote = await dbAnswer.findOneAndUpdate({upvotes: req.decoded.email},{$pull: {upvotes: req.decoded.email}})
                        if(deleteUpvote){
                            let updateDownvote = await dbAnswer.findOneAndUpdate({_id: req.params.answerId}, { $addToSet: { downvotes: req.decoded.email} })
                            res.json({
                                success: true,
                                msg: 'downvote updated'
                            })
                        }else{
                            res.json({
                                success: false,
                                
                            })
                        }
                    }else{
                        let updateDownvote = await dbAnswer.findOneAndUpdate({_id: req.params.answerId}, { $addToSet: { downvotes: req.decoded.email} })
                            res.json({
                                success: true,
                                msg: 'downvoted'
                            })
                    }
                }
            } catch(err){
                next(err)
            }
        }
    } 
     catch(err) {
        next(err)
    }
}