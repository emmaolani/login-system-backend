const bcrypt = require('bcrypt')
const {getUser} = require('../Model/user')

const loginService = async (req)=>{
    try {
        const stored_user = await getUser(req)
        console.log(stored_user)
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

