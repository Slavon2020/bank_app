import axios from "axios";
import { CreateAccountData, TransferMoneyData, UpdateAccountData } from "../types/types";

export default class AccountAPI {
    static create = (data: CreateAccountData) => axios.post('/api/v1/accounts/', data).then(res => res.data);
    static update = (data: UpdateAccountData) => axios.put('/api/v1/accounts/', data).then(res => res.data);
    static delete = (data: {number: string}) => axios.delete('/api/v1/accounts/', {
        params: {
            number: data.number
        }
    }).then(res => res.data);
    static transfer = (data: TransferMoneyData) => axios.put('/api/v1/accounts/transfer', data).then(res => res.data);
};