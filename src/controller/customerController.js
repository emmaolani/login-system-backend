const { customerService } = require('../Model/service/customerService')


class CustomerController {
    #customerService = customerService
    
    async registerCustomer(request, response){
        try {
            const customer = request.body.user
            await this.#customerService.save(customer)
            response.status(201).send('user created')
        }catch (error) {
            if (error.name == 'ConflictError'){
                response.status(409).send(error.message)
            }else if (error.name == 'ServerSideError') {
                response.status(500).send(error.message)
            }
        }
    }

    async signInCustomer(request, response){
        try {
            const credential = request.body.user;
            await this.#customerService.validate(credential);
            const customer = await this.#customerService.getCustomer(credential.email);
            request.session.customerId = customer.id;
            request.session.isAuth = true;
            response.status(200).send('login successful');
        } catch (error) {
            if (error.name == 'UnAuthourizedAccess') {
                response.status(401).send(error.message);
            }else if (error.name == 'ServerSideError'){
                response.status(500).send(error.message);
            }else{
                console.log(error);
            };
        };
    };

    async getCustomer(request, response){
        try {
            const customerId = request.session.customerId
            const customer = await this.#customerService.getCustomer(customerId)
            response.status(200).send(JSON.stringify(customer));            
        } catch (error) {
            if (error.name == 'NotFoundError') {
                response.status(404).send(error.message);   
            }else if (error.name = 'ServerSideError') {
                response.status(500).send(error.message); 
            }
        }
    }
}

const customerController = new CustomerController
module.exports = { customerController }
