const {loginService} = require('../service/login_service')

 const loginUserController = async (req, res) => {
    try {
        const [account_exist, user] = await loginService(req)
        if (account_exist == true) {
            req.session.user = user
            req.session.isauth = true
            console.log(req.session.id)
            return res.status(200).json({message: "successful"})
        }else{
            console.log('here2');
            return res.status(400).json({message: 'incorrect username or password'}) 
        }  
    } catch (error) {
        return res.status(500).json({message: 'sorry we are currently down'})
    }
 }

 module.exports = {loginUserController}
