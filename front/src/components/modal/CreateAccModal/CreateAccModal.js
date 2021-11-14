import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import AccountAPI from "../../../api/accountApi";
import { actions } from "../../../store/actions";

import './createAccModal.scss'; 

const CreateAccModal = (props) => {
    const { customer, customers, setIsShowCreateAccModal, dispatch } = props;
    const { id, name, email } = customer;
    

    const [accOptions, setAccOptions] = useState({
        currency: 'EUR',
        // balance: 0
    })

    const onChange = (field, value) => {
        setAccOptions({
            ...accOptions,
            [field]: value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        AccountAPI.createAccount({
            ...accOptions,
            customerId: id
        })
        .then(res => {
            const customersWithoutCurrent = customers.filter(customer => customer.id !== id);
            const currentCustomer = {...customer, accounts: [...customer.accounts, res]}
            dispatch(actions.setCustomers([...customersWithoutCurrent, currentCustomer]))
        })
        setIsShowCreateAccModal(false);
    }


    return (
        <div className='layout'>
            <div className='create-acc-modal'>
                <div className='customer-info'>
                    <p>customer: {name}</p>
                    <p>email: {email}</p>
                </div>
                <form onSubmit={onSubmit}>
                    <select value={accOptions.currency} onChange={(e) => onChange('currency', e.target.value)}>
                        <option value='EUR'>EUR</option>
                        <option value='USD'>USD</option>
                        <option value='UAH'>UAH</option>
                        <option value='GBP'>GBP</option>
                        <option value='CHF'>CHF</option>
                    </select>
                    <div>
                        <button type='submit'>create</button>
                        <button onClick={() => setIsShowCreateAccModal(false)}>close</button>
                    </div>
                </form>
                
                
            </div>
        </div>
    )
}

const mapStateToProps = (store) => {
    return {
        customers: store.customers
    }
}

export default connect(mapStateToProps)(CreateAccModal)