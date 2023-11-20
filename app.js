const express = require('express')
const https = require('https')
const http = require('http')
const { logEvent } = require('./middleware/logging')
const cors = require('cors')
const corsOption = require('./controller/access-control')
const { urlencoded } = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const session = require('express-session')
const redis = require('ioredis')
const { connectdb } = require('./config/connection')
const { dbMiddleware } = require('./middleware/db_middleware')
let RedisStore = require('connect-redis');
const app = express()
let redisClient = redis.createClient()
require('dotenv').config()

const db_password = process.env.DATABASE_PASSWORD

// const sslServer = https.createServer({
//     key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
//     cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
// }, app)

const server = http.createServer(app)

function routes(db) {
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
            cookie: {maxAge: 200000}
        })
    )
        app.use(dbMiddleware(db))
        app.use('/', require('./routers/topsecret'))
        app.use('/sign-up', require('./routers/signupRoute'))
        app.use('/log-in', require('./routers/loginRoute'))
        app.use('/user', require('./routers/userRoute'))
        server.listen(80, () => {
            console.log('open for business')
        })
}

connectdb(routes, db_password)



