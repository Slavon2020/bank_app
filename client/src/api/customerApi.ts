import axios from "axios";
import { AddCustomerEmployerData, CreateCustomerData, UpdateCustomerData } from "../types/types";

export class CustomerApi {
    static getAllCustomers = () => axios.get('/api/v1/customers').then(res => res.data); 
    static create = (data: CreateCustomerData) => axios.post('/api/v1/customers', data).then(res => res.data);
    static delete = (id: number) => 
        axios.delete('/api/v1/customers', {
            params: {
                id
            }
        }).then(res => res.data);
    static update = (data: UpdateCustomerData) => axios.put('/api/v1/customers', data).then(res => res.data);
    static addEmployer = (data: AddCustomerEmployerData) => axios.put('/api/v1/customers/employers', data).then(res => res.data);
}