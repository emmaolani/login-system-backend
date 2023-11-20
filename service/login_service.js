const bcrypt = require('bcrypt')
const {getUser} = require('../Model/user')

const loginService = async (req)=>{
    try {
        let data = req.body
        const result = await getUser(data.email, req.db)
        if (result[0].length == 0) {
            return [false, null]
        }
        const stored_user = result[0][0]
        const match = await bcrypt.compare(data.password, stored_user.password)
        return [match, stored_user ]  
        
    } catch (error) {
        throw error
    } 
}

module.exports = {loginService}

