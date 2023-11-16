const bcrypt = require('bcrypt')
const {addUser, checkEmailConflict} = require('../Model/user')

const register_user = async (data)=>{
    try {
        let is_user_exist = await checkEmailConflict(data.email)
        if (is_user_exist) {
            return 0        
        }  
        const hash = await bcrypt.hash(data.password, 10)
        data.password = hash
        const saved_user = await addUser(data)
        if (saved_user) {
            return 1   
        }else{
            return -1 
        }          
    } catch (error) {
        console.log(error)
    }
}

module.exports = {register_user}