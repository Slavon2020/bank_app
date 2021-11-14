import { constants } from "./constants";

export const actions = {
    setCustomers
};

function setCustomers(value) {
    return {
        type: constants.SET_CUSTOMERS,
        payload: value
    }
}