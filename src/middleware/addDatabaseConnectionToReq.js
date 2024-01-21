
function addDatabaseConnectionToReq (connection){
    return function (req, res, next) {
        req.db = connection 
        next();
    }
}

module.exports = { addDatabaseConnectionToReq }
