class CustomerDTO{
    constructor(){
        this.id = ''
        this.firstName = ''
        this.middleName = ''
        this.lastName = ''
        this.email = ''
        this.gender = ''
        this.DOB = {
            year: '',
            month: '',
            day: ''
        }
        this.address = {
            state: '',
            city: '',
            street: ''
        }
    }
}

module.exports = { CustomerDTO }