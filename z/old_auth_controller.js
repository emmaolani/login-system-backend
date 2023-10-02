const User_service = require('../service/user-service')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
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
                return this.res.status(400).json({incorrect: result})        
            }else if (result) {
                jwt.sign({email: this.req.body.email}, process.env.ACCESS_TOKEN_SECRET, (err, access_token) => {
                    if (err) throw err;
                    this.res.status(200).json({accesstoken: access_token})
                });   
            }else {
                return this.res.status(400).json({incorrect: 'incorrect username or password'}) 
            }  
        } catch (error) {
            console.log(error)
        }
    }

    async signup_user(){
        try {
            const result = await this.user_service.register_user()
            if (result ===  'user already exist' ) {
                return this.res.status(409).json({error: 'user already exist'})
            }else if (result === 'user has been created') {
                return this.res.status(201).json({sucess: 'user has been created'}) 
            }else{
                return this.res.status(500).json({'server error': 'sorry we are currently down'}) 
            }       
        } catch (error) {
            console.log(error)
            return res.status(500).json({'server error': 'sorry we are currently down'}) 
        }
    }
}

module.exports = Authenticator