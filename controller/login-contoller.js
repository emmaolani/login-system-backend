const {loginService} = require('../service/login_service')

 const loginUserController = async (req, res) => {
    try {
        const [match, user] = await loginService(req)
        if (match) {
            req.session.user = user
            req.session.isauth = true
            console.log(req.session.id)
            let sql = 'SELECT * FROM user' 
            let q = req.db.query(sql, (err, result) => {
                if(err) throw err;
                console.log(result)
            })

            return res.status(200).json({message: "successful"})
        }else {
            return res.status(400).json({message: 'incorrect username or password'}) 
        }  
    } catch (error) {
        return res.status(500).json({message: 'sorry we are currently down'})
    }
 }

 module.exports = {loginUserController}
