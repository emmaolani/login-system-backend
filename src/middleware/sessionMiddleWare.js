const session = require('express-session')
const redis = require('ioredis')
const RedisStore = require('connect-redis');
const redisClient = redis.createClient()

const sessionMiddleware = session({
    store: new RedisStore.default({ client: redisClient }),
    secret: 'my secret',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 200000}
})

module.exports = {sessionMiddleware}
