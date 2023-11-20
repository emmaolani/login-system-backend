const {register_user} = require('../service/sign-up-service')

const signupUser = async (req, res)=>{
    try {
        const store_user = await register_user(req)
        if (store_user) {
            return res.status(201).json({message: 'successful'}) 
        }else {
            return res.status(409).json({message: 'user already have an account'})
        }     
    } catch (error) {
        return res.status(500).json({message: 'sorry we are currently down'}) 
    }
}

module.exports = {signupUser}