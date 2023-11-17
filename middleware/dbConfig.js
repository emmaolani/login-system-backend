const mysql = require('mysql2/promise')

const connectdb = async (server, password) =>{
    const db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password:  password,
        database: 'coral_store'
    
    })
    server(db)
}


module.exports = { connectdb }
