import axios from "axios";
import { CreateAccountData, TransferMoneyData, UpdateAccountData } from "../types/types";

export default class AccountAPI {
    static createAccount = (data: CreateAccountData) => axios.post('/accounts', data).then(res => res.data);
    static updateAccount = (data: UpdateAccountData) => axios.put('/accounts', data).then(res => res.data);
    static deleteAccount = (data: {number: string}) => axios.delete('/accounts', {
        params: {
            number: data.number
        }
    }).then(res => res.data);
    static transferMoney = (data: TransferMoneyData) => axios.put('/accounts/transfer', data).then(res => res.data);
};