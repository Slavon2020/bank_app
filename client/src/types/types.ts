import { compose } from "redux";

export type STORE = {
    customers: Array<TCustomer>;
    employers: Array<TEmployer>;
}

export type TCustomer = {
    id: number;
    name: string;
    email: string;
    age: number;
    accounts: Array<TAccount>;
    employers: Array<TEmployer>;
}

export type TAccount = {
    id?: number;
    number: string;
    currency: Currency;
    balance: number;
    customer?: TCustomer;
}

export type TEmployer = {
    id: number;
    name: string;
    address: string;
}

export type UpdateAccountData = {
    id: number,
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
    email: string,
    employer?: TEmployer;
}

export type CreateAccountData = {
    customerId: number;
    currency: Currency;
}

export type CreateEmployerData = {
    name: string;
    address: string;
}



export type TransferMoneyData = {
    accNumberFrom: string;
    sumAccFrom: number;
    accNumberTo: string;
    sumAccTo: number;
}

export type AddCustomerEmployerData = {
    customerId: number;
    employerId: number;
}

export type Obj = {
    [key: string]: any
}

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }
 