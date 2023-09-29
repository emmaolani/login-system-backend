const express = require('express')
const https = require('https')
const { logEvent } = require('../middleware/logging')
const cors = require('cors')
const corsOption = require('../controller/access-control')
const { urlencoded } = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const fs = require('fs')
const { connectToDb, getDb } = require('../controller/mongodb')
const EventEmitter = require('events')
const { emit } = require('process')
const emitter = new EventEmitter();

const app = express()
let db 
// All default middle-ware
app.use(logEvent)
app.use(cors(corsOption))
app.use(urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())

emitter.on('connectRouteToDb', function() {
    app.use('/sign-up', require('../routers/RegisterRoute'))
})

const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app)

connectToDb((err) => {
    if (!err) {
        db = getDb()
        console.log('test');
        emitter.emit('connectRouteToDb')
        sslServer.listen(80, () => {
            console.log('open for business')
        })

    }else{
        console.log("couldn't connect to database")
    }
}) 
