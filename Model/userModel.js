const fs = require('fs/promises')
const path = require('path')


class User_model {
    constructor(email, password){
        this.email = email
        this.password = password
        this.db_path = path.join(__dirname, 'model.json')
    }

    async addUser(){
        const raw_data = await fs.readFile(this.db_path)
        const data = JSON.parse(raw_data)
        const new_user = {email: this.email,
                          password: this.password
                        }
        data.users.push(new_user)
        try {
            await fs.writeFile(this.db_path, JSON.stringify(data))   
            return true
        } catch (error) {
            return error
        }

    }
    async compare_user(){
        try {
            let raw_data = await fs.readFile(this.db_path)
            let data = JSON.parse(raw_data)

            if (data.users.length > 0) {
                for (let i = 0; i < data.users.length; i++) {
                    if (data.users[i].email === this.email) {
                        return true
                    }                
                }  
            }
        } catch (error) {
            console.log(error)
        }
    }
    async get_user(){
        try {
            let raw_data = await fs.readFile(this.db_path)
            let data = JSON.parse(raw_data)
            if (data.users.length > 0) {
                for (let i = 0; i < data.users.length; i++) {
                    if (data.users[i].email === this.email) {
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
}

module.exports = User_model