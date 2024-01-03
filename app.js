const express = require('express')
const https = require('https')
const http = require('http')
const { logEvent } = require('./middleware/logging')
const cors = require('cors')
const corsOption = require('./controller/access-control')
const { urlencoded } = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const { connectdb } = require('./config/connection')
const { dbMiddleware } = require('./middleware/db_middleware')
const { sessionMiddleware, useSessionMiddlewareForWebSocketConnnections } = require('./middleware/sessionMiddleWare')
const app = express()
const {Server} = require('socket.io')
const { log } = require('console')

// const sslServer = https.createServer({
//     key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
//     cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
// }, app)

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true
    },
    cookie: {
        name: "io",
        path: "/",
        httpOnly: true,
    }
})

function application(db) {
    app.use(logEvent) 
    app.use(cors(corsOption))
    app.use(urlencoded({extended: true}))
    app.use(express.json())
    app.use(express.static(path.join(__dirname, 'public')))
    app.use(cookieParser())
    app.use(sessionMiddleware)
    app.use(dbMiddleware(db))

    app.use('/', require('./routers/topsecret'))
    app.use('/sign-up', require('./routers/signupRoute'))
    app.use('/log-in', require('./routers/loginRoute'))
    app.use('/user', require('./routers/userRoute'))

    io.engine.use(useSessionMiddlewareForWebSocketConnnections)

    io.engine.on('initial_headers' , async (headers, req)=>{
        console.log('cookie start', req.session.id, 'cookie ends');
    })

    io.on('connection', socket => {
        // socket.emit('your id', socket.id)
        console.log('number of client connected2', io.engine.clientsCount)
        // console.log(socket.request.headers);

        socket.on('disconnect', (reason)=>{
            console.log('disconnected because', reason)
        })

        socket.on('send_message', (data)=>{
            console.log('number of client connected2', io.engine.clientsCount)
            for (let index = 0; index < 100000000; index++) {
                const element = index;  
            }
            socket.emit('orderPlaced', data)
            console.log(data)
        })
        console.log('websocket connection established', socket.id);
    })

    server.listen(80, () => {
        console.log('open for business')
    })
}


connectdb(application)




