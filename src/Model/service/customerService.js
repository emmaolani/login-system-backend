class CustomerService {
    constructor(){
        this.customerDAO = null
    }

    async save(customer){
        try {
           console.log('service');
        } catch (error) {

        }
    }
    async validate(customer){
        try {
            console.log('service');
        } catch (error) {
            
        }
    }
    async getCustomer(customerId){
        try {
            console.log('service');
        } catch (error) {
            
        }
    }

}

const customerService = new CustomerService()
module.exports = { customerService }
