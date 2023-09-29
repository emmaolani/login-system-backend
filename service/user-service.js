const bcrypt = require('bcrypt')
const User_model = require('../Model/userModel')


class user_service {
    constructor(email, password){
        this.email = email
        this.password = password
        this.user_model = new User_model(this.email, this.password)
    }

    async register_user(){
        try {
            let is_user_exist = await this.user_model.compare_user()
            if (is_user_exist) {
                return 'user already exist'        
            }  
    
            const hash = await bcrypt.hash(password, 10)

            const saved_user = await this.user_model.addUser()
            if (saved_user) {
                return 'user has been created'    
            }else{
                return 'server error' 
            }          
        } catch (error) {
            console.log(error)
        }
    }
    
    async login_user(){
        try {
            const stored_user = await this.user_model.get_user()
            if (stored_user === undefined) {
                return 'incorrect username or password'
            }
            const match = await bcrypt.compare(this.password, stored_user.password)
            
            return match
           
        } catch (error) {
            console.log(error)
        } 
    }
}

module.exports = user_service