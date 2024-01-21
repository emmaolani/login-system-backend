class StubMessenger{
    constructor(){
        this.message
    }
    send(message){
       this.message = message
    }
}

const stubMessenger = new StubMessenger()
module.exports = { stubMessenger }
