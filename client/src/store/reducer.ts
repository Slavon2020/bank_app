import { Obj, STORE } from "../types/types";
import { updateCustomers, updateCustomersAccounts } from "../utils/utilFunctions";
import { constants } from "./constants";

const initialStore: STORE = {
	customers: [],
	employers: []
}

// TODO type ANY
export const reducer = (state = initialStore, action: Obj) => {
	const { type, payload } = action;
	
	switch (type) {
		case constants.SET_CUSTOMERS:
			return {...state, customers: payload}
		case constants.ADD_CUSTOMER:
			return {...state, customers: [...state.customers, payload]}

		case constants.UPDATE_CUSTOMER:
			const updatedCustomers = updateCustomers(state.customers, payload);
			return {...state, customers: updatedCustomers}

		case constants.DELETE_CUSTOMER:
			return {...state, customers: state.customers.filter(customer => customer.id !== payload)}
		
		case constants.ADD_ACCOUNT:
			const updatedCustomersAccounts = updateCustomersAccounts(state.customers, payload.account, payload.customerId, 'add')
			return {
				...state,
				customers: updatedCustomersAccounts
			}

		case constants.DELETE_ACCOUNT:
			const customersWithDeletedAcc = updateCustomersAccounts(state.customers, payload.account, payload.customerId, 'delete');
			return {
				...state,
				customers: customersWithDeletedAcc
			}

		case constants.UPDATE_ACCOUNT:
			const customersWithUpdatedAcc = updateCustomersAccounts(state.customers, payload.account, payload.customerId, 'update');
			return {
				...state,
				customers: customersWithUpdatedAcc
			}

		case constants.SET_EMPLOYERS:
			return {...state, employers: payload}

		case constants.SAVE_EMPLOYER:
			return {...state, employers: [...state.employers, payload]}

		case constants.DELETE_EMPLOYER:
			return {...state, employers: state.employers.filter(e => e.id !== payload)}
		
		default:
			return state;
	}
}