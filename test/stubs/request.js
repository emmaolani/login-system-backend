class StubRequest{
    constructor(){
        this.body = {
            user: {
                firstName: 'user',
                lastName: 'father',
                email: 'email@gmail.com'
            }
        };
        this.session = {};
    }
}

const stubRequest = new StubRequest()

module.exports = { stubRequest }