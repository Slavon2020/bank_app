import axios from "axios"

export default class CustomerAPI {
    static createCustomer = data => axios.post('/customers', data).then(res => res.data);
    static getAllCustomers = () => axios.get('/customers').then(res => res.data);
    static deleteCustomer = id => 
        axios.delete('/customers', {
            params: {
                id
            }
        }).then(res => res.data);

    static updateCustomer = data => axios.put('/customers', data).then(res => res.data);
};
