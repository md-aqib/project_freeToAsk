const dbProfile = require('../../models/profile')
const dbLogin = require('../../models/userLogin')


module.exports = async(req, res) => {
    try{
        let loginData = await dbLogin.findOne({email: req.decoded.email})
        if(!loginData || loginData == 0){
            console.log(loginData)
            res.json({
                success: false,
                msg: 'User not logged in'
            })
        }else{
            try{
                let profileData = await dbProfile.find({email: req.decoded.email})
                res.json({
                    success: false,
                    msg: 'Profile Data',
                    profile: profileData
                })
            } catch(err) {
                console.log(err)
            }
            
        }
    } catch(err){
        console.log(err)
    }
    

}