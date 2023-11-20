const mysql = require('mysql2/promise')

const connectdb = async (server, password) =>{
    try {
        const db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password:  password,
            database: 'coral_store'
        })
        server(db)  
    } catch (error) {
        throw error
    }
   
}


module.exports = { connectdb }
