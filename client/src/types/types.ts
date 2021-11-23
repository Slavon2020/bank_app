import { compose } from "redux";

 
export type STORE = {
    customers: Array<TCustomer>;
}

export type TCustomer = {
    id: number;
    name: string;
    email: string;
    age: number;
    accounts: Array<TAccount>;
}

export type TAccount = {
    id?: number;
    number: string;
    currency: Currency;
    balance: number;
    customer?: TCustomer;
}

export type UpdateAccountData = {
    number: string,
    balance: number
}

export type Currency = 'UAH' | 'EUR' | 'USD' | 'GBP' | 'CHF';

export type CreateCustomerData = {
    name: string;
    email: string;
    age: number
}

export type UpdateCustomerData = {
    id: number;
    name: string;
    email: string
}

export type CreateAccountData = {
    customerId: number;
    currency: Currency;
}

export type TransferMoneyData = {
    accNumberFrom: string;
    sumAccFrom: number;
    accNumberTo: string;
    sumAccTo: number;
}

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }
 