const {Server} = require('socket.io')
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true
    }
})

function webSocketApp(io, sessionMiddleware) {
    io.engine.use(sessionMiddleware)

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
            socket.emit('orderPlaced', data)
            console.log(data)
        })
        console.log('websocket connection established', socket.id);
    })
}

module.exports = { webSocketApp }