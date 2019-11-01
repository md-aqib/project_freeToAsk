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

exports.downvote = (req, res) => {
    
}