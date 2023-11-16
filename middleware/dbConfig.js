const mysql = require('mysql2')

db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'fissyemmybumz',
    database: 'coral_store'

})

module.exports = { db }
