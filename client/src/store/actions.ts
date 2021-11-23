import { TAccount, TCustomer } from "../types/types";
import { constants } from "./constants";

export const actions = {
    setCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    addAccount,
    deleteAccount,
    updateAccount
};

function setCustomers(value: Array<TCustomer>) {
    return {
        type: constants.SET_CUSTOMERS,
        payload: value
    }
}

function addCustomer(value: TCustomer) {
    return {
        type: constants.ADD_CUSTOMER,
        payload: value
    }
}

function updateCustomer(value: TCustomer) {
    return {
        type: constants.UPDATE_CUSTOMER,
        payload: value
    }
}

function deleteCustomer(id: number) {
    return {
        type: constants.DELETE_CUSTOMER,
        payload: id
    }
}

function addAccount(value: {account: TAccount, customerId: number}) {
    return {
        type: constants.ADD_ACCOUNT,
        payload: value
    }
}

function deleteAccount(value: {customerId: number, account: TAccount}) {
    return {
        type: constants.DELETE_ACCOUNT,
        payload: value
    }
}

function updateAccount(value: {account: TAccount, customerId: number} ) {
    return {
        type: constants.UPDATE_ACCOUNT,
        payload: value
    }
}