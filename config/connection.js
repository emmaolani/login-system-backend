const mysql = require('mysql2/promise')

require('dotenv').config()
const password = process.env.DATABASE_PASSWORD

const connectdb = async (server) =>{
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
