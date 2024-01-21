const express = require('express')
const { logEvent } = require('../middleware/logging')
const cors = require('cors')
const corsOption  = require('../config/corsOptions')
const { urlencoded } = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const { addDatabaseConnectionToReq } = require('../middleware/addDatabaseConnectionToReq')


function expressApp(app, sessionMiddleware, databaseConnection) {
    app.use(logEvent) 
    app.use(cors(corsOption))
    app.use(urlencoded({extended: true}))
    app.use(express.json())
    app.use(express.static(path.join(__dirname, 'public')))
    app.use(cookieParser())
    app.use(sessionMiddleware)
    app.use(addDatabaseConnectionToReq(databaseConnection))

    app.use('/', require('../routers/topsecret'))
    app.use('/sign-up', require('../routers/signupRoute'))
    app.use('/log-in', require('../routers/loginRoute'))
    app.use('/user', require('../routers/userRoute'))
}

module.exports = { expressApp }