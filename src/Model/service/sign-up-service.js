const bcrypt = require('bcrypt')
const {addUser, getUser} = require('../src/Model/user')

const register_user = async (req)=>{
    try {
        let data = req.body
        let user = await getUser(data.email, req.db)
        if (user[0].length > 0) {
            return false        
        }  
        const hash = await bcrypt.hash(data.password, 10)
        data.password = hash
        
        return await addUser(data, req.db)
        
       
    } catch (error) {
        throw error
    }
}

module.exports = {register_user}