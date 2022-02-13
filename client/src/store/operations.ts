import { CustomerApi } from '../api/customerApi';
import { actions } from './actions';
import EmployerApi from '../api/employerApi';
import {CreateEmployerData, TCurrency, TAccount, TCustomer, TEmployer} from "../types/types";
import AccountAPI from "../api/accountApi";

// Accounts

export const saveAccount = (customerId: number, currency: TCurrency) =>
    (dispatch: any) => {
        AccountAPI.create({
            customerId,
            currency
        }).then(res => {
            dispatch(actions.addAccount({account: res, customerId}));
        })
    }

export const updateAccount = (id: number, balance: number) =>
    (dispatch: any) => {
        AccountAPI.update({
            id,
            balance
        }).then(account => {
            dispatch(actions.updateAccount({ account, customerId: id as number}));
        })
}

export const removeAccount = (customerId: number, account: TAccount) =>
    (dispatch: any) => {
        AccountAPI.delete({
            number: account.number
        }).then(res => {
            if (res.deleted) {
                dispatch(actions.deleteAccount({
                    customerId,
                    account
                }))
            }
        })
    }

export const transfer = (
    accNumberFrom: string,
    sumAccFrom: number,
    accNumberTo: string,
    sumAccTo: number,
    account: TAccount,
    customerId: number,
    transferAccountTo :TAccount,
    setTransferAccountTo: Function

) => (dispatch: any) => {
        AccountAPI.transfer({
            accNumberFrom,
            sumAccFrom,
            accNumberTo,
            sumAccTo
        }).then(res => {
            const {accNumberFrom, sumAccFrom, accNumberTo, sumAccTo} = res;

            dispatch(actions.updateAccount({
                account: {
                    ...account,
                    number: accNumberFrom,
                    balance: account.balance - sumAccFrom
                },
                customerId
            }));

            dispatch(actions.updateAccount({
                account: {
                    ...transferAccountTo,
                    number: accNumberTo,
                    balance: transferAccountTo.balance + sumAccTo
                },
                customerId
            }));

            setTransferAccountTo({
                ...transferAccountTo,
                balance: transferAccountTo.balance + sumAccTo
            });
        })
    }


// Customers

export const saveCustomer = (customer: TCustomer) =>
    (dispatch: any) => {
        CustomerApi.create(customer).then((newCustomer) => {
            dispatch(actions.addCustomer(newCustomer));
        })
    }

export const loadAllCustomers = () =>
    (dispatch: any) => {
        CustomerApi.getAll().then(customers => {
            dispatch(actions.setCustomers(customers))
        })
}

export const customerUpdate = (id: number, name: string, email: string, ) =>
    (dispatch: any) => {
        CustomerApi.update({
            id,
            name,
            email
        }).then(updatedCustomer => {
            dispatch(actions.updateCustomer(updatedCustomer))
        })
}

export const addEmployerToCustomer = (
    customerId: number,
    employerId: number,
    customer: TCustomer,
    currentEmployer: TEmployer
) =>
    (dispatch: any) => {
        CustomerApi.addEmployer({
            customerId,
            employerId
        }).then(_res => {
            const updatedCustomer = {...customer};
            updatedCustomer?.employers?.push(currentEmployer!)
            dispatch(actions.updateCustomer(updatedCustomer))
        })
    }

export const deleteCustomerById = (id: number) =>
    (dispatch: any) => {
        CustomerApi.delete(id).then(res => {
            if (res.deleted) {
                dispatch(actions.deleteCustomer(id));
            }
        })
    }

// Employers

export const getAllEmployers = () =>
    (dispatch: any) => {
        EmployerApi.getEmployers().then(res => {
            dispatch(actions.setEmployers(res));
        })
    }

export const loadAllEmployers = () =>
    (dispatch: any) => {
        EmployerApi.getEmployers().then(employers => {
            dispatch(actions.setEmployers(employers));
        })
    }

export const saveEmployer = (employer: CreateEmployerData) =>
    (dispatch: any) => {
        EmployerApi.create(employer).then(res => {
            dispatch(actions.saveEmployer(res));
        })
    }

export const updateEmployer = (name: string, address: string, id: number) =>
    () => {
        EmployerApi.update({
            name,
            address,
            id
        })
}

export const removeEmployer = (id: number) =>
    (dispatch: any) => {
        EmployerApi.delete(id).then(res => {
            if (res.deleted) {
                dispatch(actions.deleteEmployer(id));
            }
        })
}