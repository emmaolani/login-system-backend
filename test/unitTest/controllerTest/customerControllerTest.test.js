const { customerController} = require('../../../src/controller/customerController');
const { customerService } = require('../../../src/Model/service/customerService');
const { ServerSideError } = require('../../../src/customError/serverSideError')
const { UnAuthourizedAccess } = require('../../../src/customError/unAuthoutrizedAccess')
const { ConflictError } = require('../../../src/customError/conflictError')
const { NotFoundError } = require('../../../src/customError/notFoundError')
const { CustomerDTO } = require('../../../src/Model/DTO/CustomerDTO')
const { stubRequest } = require('../../stubs/request');
const { stubResponse } = require('../../stubs/response');
jest.mock('../../../src/Model/service/customerService');

beforeEach(()=>{
    jest.clearAllMocks()
})


describe('test for user controller class', () => {
    describe('unit test register method for the user controller ', ()=>{
        it('it should send 201 response after creating customer', async ()=>{
            customerService.save.mockImplementationOnce(()=>{
                return true;
            });
    
            const spy = jest.spyOn(stubResponse, 'status');
            await customerController.registerCustomer(stubRequest, stubResponse);
            expect(spy).toHaveBeenCalledWith(201);            
        })
        
        it('it should send 409 response if email exist', async ()=>{
            customerService.save.mockImplementationOnce(()=> {
                throw new ConflictError('user already exist')
            });
            
            const spy = jest.spyOn(stubResponse, 'status');
            await customerController.registerCustomer(stubRequest, stubResponse);
            expect(spy).toHaveBeenCalledWith(409);
        });
    
        it('should send 500 response when internal server error occurs', async () => {
            customerService.save.mockImplementationOnce(()=> {
                throw  new ServerSideError('please try again later')
            });
            
            const spy = jest.spyOn(stubResponse, 'status');
            await customerController.registerCustomer(stubRequest, stubResponse);
            expect(spy).toHaveBeenCalledWith(500);
        });   
    });

    describe('unit test for the sign-in method for user controller', () => {
        it('should send a 200 response when user have sucessfully login', async () => {
            customerService.validate.mockImplementationOnce(()=> {
                return true;
            });

            customerService.getCustomer.mockImplementationOnce(()=>{
                const customer = new CustomerDTO()
                return customer
            });

            const spy = jest.spyOn(stubResponse, 'status');
            await customerController.signInCustomer(stubRequest, stubResponse);
            expect(spy).toHaveBeenCalledWith(200);
        });

        it('should send a 401 when user provides invalid credentials', async () => {
            customerService.validate.mockImplementationOnce(()=> {
                throw new UnAuthourizedAccess('invalid credentials')
            });

            const spy = jest.spyOn(stubResponse, 'status');
            await customerController.signInCustomer(stubRequest, stubResponse);
            expect(spy).toHaveBeenCalledWith(401);
        });

        it('should send 500 response when internal server error occurs', async () => {
            customerService.validate.mockImplementationOnce(()=> {
                throw new ServerSideError('please try again later');
            });

            const spy = jest.spyOn(stubResponse, 'status');
            await customerController.signInCustomer(stubRequest, stubResponse);
            expect(spy).toHaveBeenCalledWith(500);
        });   
    });

    describe('unit test for get user method in user controller class', () => {
        it('should send a 200 status response with user entity', async () => {
            customerService.getCustomer.mockImplementation(() => {
                const customer = new CustomerDTO();
                return customer;
            });

            const spy = jest.spyOn(stubResponse, 'status');
            await customerController.getCustomer(stubRequest, stubResponse);
            expect(spy).toHaveBeenCalledWith(200);
        });

        it('should send a 404 status if user is not found', async () => {
            customerService.getCustomer.mockImplementation(() => {
              throw new NotFoundError(' customer does not exist')
            });
            const spy = jest.spyOn(stubResponse, 'status');
            await customerController.getCustomer(stubRequest, stubResponse);
            expect(spy).toHaveBeenCalledWith(404);
        });

        it('should send a 500 status code if internal server error occurs', async () => {
            customerService.getCustomer.mockImplementation(() => {
                throw new ServerSideError('please try again later');
            });
            const spy = jest.spyOn(stubResponse, 'status');
            await customerController.getCustomer(stubRequest, stubResponse);
            expect(spy).toHaveBeenCalledWith(500);
        });
    });
});
