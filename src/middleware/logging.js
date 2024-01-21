const dt = require('date-and-time')
const path = require('path')
const fs = require('fs/promises')

const logger = async (loc, msg) => {
    const now = new Date()
    dateTime =  dt.format(now, 'YY/MM/DD HH:mm:ss')
    directory = path.join(__dirname, '..', 'Doc', `${loc}`)
    try {
        await fs.appendFile(directory, `${dateTime}\t${msg}\n`)
    } catch (error) {
        console.log(error)   
    }
}

const logEvent = (req, res, next) => {
    let value = `${req.url}\t${req.method}\t${req.hostname}\t${req.header.origin}`
    logger("req.txt", value)
    next()
}

const logError = (req, res, next) => {
    let value = `${req.url}\t${req.method}\t${req.hostname}\t${req.header.origin}`
    logger("err.txt", value)
    next()
}

module.exports = {logEvent, logError}