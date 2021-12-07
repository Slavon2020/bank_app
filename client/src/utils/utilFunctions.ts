import { TAccount, TCustomer, UpdateCustomerData } from "../types/types";

export const updateCustomers = (customers: Array<TCustomer>, updatedCustomerData: UpdateCustomerData): Array<TCustomer> => {
    const customersWithoutUpdated = customers.filter(el => el.id !== updatedCustomerData.id);
    const currentCustomer = customers.find(customer => customer.id === updatedCustomerData.id);
    
    return [...customersWithoutUpdated, {...currentCustomer, ...updatedCustomerData} as TCustomer];
};

export const updateCustomersAccounts = (customers: Array<TCustomer>, account: TAccount, customerId: number, action: string): Array<TCustomer> => {
    let currentCustomer = customers.find(customer => customer.id === customerId);
    if (!currentCustomer) return customers;
    currentCustomer = {...currentCustomer};
    const customersWithoutCurrent = customers.filter(customer => customer.id !== currentCustomer!.id);

    if (action === 'add') {
        currentCustomer.accounts = currentCustomer.accounts ? [...currentCustomer.accounts, account] : [account];
        return [...customersWithoutCurrent, currentCustomer]
    } 
    if (action === 'delete') {
        currentCustomer.accounts = currentCustomer.accounts.filter(acc => acc.number !== account.number)
        return [...customersWithoutCurrent, currentCustomer]
    }
    if (action === 'update') {
        const currentCustomerAccounts = currentCustomer.accounts;
        const accsWithoutUpdated = currentCustomerAccounts.filter(acc => acc.number !== account.number);
        currentCustomer.accounts = [...accsWithoutUpdated, account];
        return [...customersWithoutCurrent, currentCustomer];
    }
    return customers;
};