const { stubMessenger } = require('./messenger')

class StubResponse{
    constructor(){
        this.statusCode
        this.messenger = stubMessenger
    }
    status(status){
        this.statusCode = status
        return this.messenger
    }
}

const stubResponse = new StubResponse()
module.exports = { stubResponse }
