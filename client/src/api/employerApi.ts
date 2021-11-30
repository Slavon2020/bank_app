import axios from "axios";
import { CreateEmployerData } from "../types/types";

export default class EmployerApi {
    static createEmployer = (data: CreateEmployerData) => axios.post('/employers', data).then(res => res.data);
    static getEmployers = () => axios.get('employers').then(res => res.data);
}