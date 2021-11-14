import { constants } from "./constants";

const initialStore = {
	customers: []
}

export const reducer = (state = initialStore, action) => {
	switch (action.type) {
		case constants.SET_CUSTOMERS:
			return {...state, customers: action.payload}
		
		default:
			return state;
	}
}