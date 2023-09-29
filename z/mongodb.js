const { MongoClient } = require('mongodb')

let dbConnection 

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect('mongodb://127.0.0.1:27017/store')
            .then((client)=> {
                dbConnection = client.db()
                console.log('test2')
                return cb()
            })
            .catch(err => {
                console.log(err)
                return cb(err)
            })
    },

    getDb: () => dbConnection
}