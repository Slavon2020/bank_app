import axios from "axios";
import { CreateEmployerData, TEmployer } from "../types/types";

export default class EmployerApi {
    static create = (data: CreateEmployerData) => axios.post('/api/v1/employers', data).then(res => res.data);
    static update = (data: TEmployer) => axios.put('/api/v1/employers', data).then(res => res.data);
    static delete = (id: number) => 
        axios.delete('/api/v1/employers', {
            params: {
                id
            }
        }).then(res => res.data);
    static getEmployers = () => axios.get('/api/v1/employers').then(res => res.data);
}