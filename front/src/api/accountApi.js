import axios from "axios";

export default class AccountAPI {
    static createAccount = data => axios.post('/accounts', data).then(res => res.data);
    static deleteAccount = ({ number }) => axios.delete('/accounts', {
        params: {
            number
        }
    }).then(res => res.data);
};