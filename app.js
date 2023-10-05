const express = require('express')
const https = require('https')
const { logEvent } = require('./middleware/logging')
const cors = require('cors')
const corsOption = require('./controller/access-control')
const { urlencoded } = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const fs = require('fs')
const session = require('express-session')
const redis = require('ioredis')

let RedisStore = require('connect-redis');

const app = express()
let redisClient = redis.createClient()

// All default middle-ware
app.use(logEvent)  
app.use(cors(corsOption))
app.use(urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())

app.use(
    session({
        store: new RedisStore.default({ client: redisClient }),
        secret: 'my secret',
        resave: false,
        saveUninitialized: true,
        cookie: {maxAge: 600000}
    })
)


const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app)


app.use('/', require('./routers/topsecret'))
app.use('/sign-up', require('./routers/RegisterRoute'))
app.use('/log-in', require('./routers/loginRoute'))



sslServer.listen(80, () => {
    console.log('open for business')
})


