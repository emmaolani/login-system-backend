class UnAuthourizedAccess extends Error{
    constructor(message){
        super(message);
        this.name = 'UnAuthourizedAccess';
    };
};

module.exports = { UnAuthourizedAccess }