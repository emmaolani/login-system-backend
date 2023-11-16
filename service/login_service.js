const bcrypt = require('bcrypt')
const {identifyUser} = require('../Model/user')

const loginService = async (email, password)=>{
    try {
        const stored_user = await identifyUser(email)
        if (stored_user === undefined) {
            return [false, stored_user]
        }
        const match = await bcrypt.compare(password, stored_user.password)
        return [match, stored_user ]  
        
    } catch (error) {
        console.log(error)
        return error
    } 
}

module.exports = {loginService}

