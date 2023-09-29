const { getDb } = require('./mongodb')
let db = getDb()

function addUserToDb(res , newUser) {
    db.collection('user')
        .insertOne(newUser)
        .then((result) => {
            res.status(201).json(result)
        })
}

const registrar = (req, res) => {
    let newUser = req.body
    db.collection('user')
        .findOne({ email: newUser.email})
        .then((result) => {
            if (!result){
                addUserToDb(res , newUser)
            }else {
                res.status(409).json({error: 'user already exist'})
            }
        })
        .catch((error) => {
            res.status(500).json({error: 'internal server error'})
            console.log(error)
        })
}

module.exports = registrar