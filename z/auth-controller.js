const User_service = require('./user-service')
const dotenv = require('dotenv')
dotenv.config()


class Authenticator {
    constructor(req, res){
        this.req = req
        this.res = res
        this.user_service = new User_service(this.req.body.email, this.req.body.password)  
    }

    async login_user(){
        try {
            const result = await this.user_service.login_user()
            if (result === 'incorrect username or password') {
                return this.res.status(400).json({message: result})        
            }else if (result) {
                this.req.session.email = this.req.body.email
                this.req.session.isauth = true
                this.res.status(200).json({message: "successful"})
            }else {
                return this.res.status(400).json({message: 'incorrect username or password'}) 
            }  
        } catch (error) {
            return res.status(500).json({message: 'sorry we are currently down'})
        }
    }

    async signup_user(){
        try {
            const result = await this.user_service.register_user()
            if (result ===  'user already exist' ) {
                return this.res.status(409).json({message: 'user already have an account'})
            }else if (result === 'user has been created') {
                return this.res.status(201).json({message: 'successful'}) 
            }else{
                return this.res.status(500).json({message: 'sorry we are currently down'}) 
            }       
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: 'sorry we are currently down'}) 
        }
    }
}

module.exports = Authenticator


