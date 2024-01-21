const mysql = require('mysql2')

const addUser = async (data, connection)=>{
    const values = [
        data.firstname,
        data.middlename,
        data.lastname,
        data.email,
        data.password
        ]
    let sql = mysql.format('INSERT INTO user (first_name, middle_name, last_name, email, password) VALUES (?)' , [values]) 
    try {
        await connection.execute(sql);
        return true
    } catch (error) {
        throw error
    }

}

const getUser = async (email, connection)=>{
    try {
        let sql = mysql.format('SELECT * FROM user WHERE email = ?' , [email]) 
        let data = await connection.execute(sql);
        return data
    } catch (error) {
        throw error
    }
}

module.exports = {addUser, getUser}