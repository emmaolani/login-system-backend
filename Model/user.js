const fs = require('fs/promises')
const path = require('path')
const db_path = path.join(__dirname, 'model.json')

const addUser = async (user)=>{
    const raw_data = await fs.readFile(db_path)
    const data = JSON.parse(raw_data)
    const new_user = user
    data.users.push(new_user)
    try {
        await fs.writeFile(db_path, JSON.stringify(data))   
        return true
    } catch (error) {
        return error
    }

}

const checkEmailConflict = async (userEmail)=>{
    try {
        let raw_data = await fs.readFile(db_path)
        let data = JSON.parse(raw_data)

        if (data.users.length > 0) {
            for (let i = 0; i < data.users.length; i++) {
                if (data.users[i].email === userEmail) {
                    return true
                }                
            }  
        }else{
            return false
        }
    } catch (error) {
        console.log(error)
    }
}
const identifyUser = async (userId)=>{
    try {
        let raw_data = await fs.readFile(db_path)
        let data = JSON.parse(raw_data)
        if (data.users.length > 0) {
            for (let i = 0; i < data.users.length; i++) {
                if (data.users[i].email === userId) {
                    const user_info = {
                        email: data.users[i].email, 
                        password: data.users[i].password
                    } 
                    return user_info          
                }                
            }  
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {addUser, identifyUser, checkEmailConflict}