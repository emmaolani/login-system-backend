const express = require('express')
const https = require('https')
const http = require('http')
const { connectToDataBase } = require('./src/config/connectToDatabase')
const { expressApp } = require('./application/expressApp')
const { sessionMiddleware } = require('./middleware/sessionMiddleWare')

const app = express()

const server = http.createServer(app)


function application(databaseConnection) {
    expressApp(app, sessionMiddleware, databaseConnection)
    server.listen(80, () => {
        console.log('open for business')
    })
}

//  must connect to database before initializing server
connectToDataBase(application)




// const sslServer = https.createServer({
//     key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
//     cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
// }, app)

