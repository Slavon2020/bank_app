import axios from "axios";
import { CreateCustomerData, UpdateCustomerData } from "../types/types";

export class CustomerApi {
    static getAllCustomers = () => axios.get('/customers').then(res => res.data); 

    static createCustomer = (data: CreateCustomerData) => axios.post('/customers', data).then(res => res.data);

    static deleteCustomer = (id: number) => 
        axios.delete('/customers', {
            params: {
                id
            }
        }).then(res => res.data);

    static updateCustomer = (data: UpdateCustomerData) => axios.put('/customers', data).then(res => res.data);
}