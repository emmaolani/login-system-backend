class ServerSideError extends Error{
    constructor(message){
        super(message);
        this.name = 'ServerSideError';
    };
};

module.exports = { ServerSideError }