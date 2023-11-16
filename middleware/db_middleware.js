
function dbMiddleware (connection){
    return function (req, res, next) {
        console.log('connect')
        req.db = connection 
        next();
    }
}

module.exports = { dbMiddleware }
