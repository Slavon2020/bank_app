import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CustomerAPI from "../../api/customerApi";
import { actions } from "../../store/actions";
import Customer from "../Customer/Customer";

import './Main.scss';

const Main = (props) => {
    const { customers, dispatch } = props;

    const [createCustomerFields, setCreateCustomerFields] = useState({
        name: '',
        age: 0,
        email: '',
    });

    useEffect(() => {
        CustomerAPI.getAllCustomers()
            .then(customers => dispatch(actions.setCustomers(customers)));
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        CustomerAPI.createCustomer(createCustomerFields)
            .then(customer => {
                dispatch(actions.setCustomers([...customers, customer]));
                setCreateCustomerFields({
                    name: '',
                    age: 0,
                    email: '',
                })
            });
    };

    const onChangeCustomerField = (event, field) => {
        const { value, checked } = event.target;
        if (field === 'eur' || field === 'usd' || field === 'uah' || field === 'gbp' || field === 'chf') {
            setCreateCustomerFields({
                ...createCustomerFields,
                currency: {
                    ...createCustomerFields.currency,
                    [field]: checked
                }
            });
            return;
        }
        setCreateCustomerFields({...createCustomerFields, [field]: value});
    }

    const { name, age, email } = createCustomerFields;
    return (
        <div>
            <div className='create-customer'>
                <h3>Create customer</h3>
                <form onSubmit={onSubmit} className='form'>
                    <div className='fields'>
                        <input onChange={(e) => onChangeCustomerField(e, 'name')} value={name} type='text' placeholder='name' />
                        <input onChange={(e) => onChangeCustomerField(e, 'email')} value={email} type='text' placeholder='email' />
                        <input onChange={(e) => onChangeCustomerField(e, 'age')} value={age} name={age} type='number' placeholder='age' />
                    </div>        
                    <button type='submit'>create</button>
                </form>
            </div>
            
            <div>
                <h3>Customers list:</h3>
               {customers.map((customer, ind) => {
                   const { id } = customer;
                   return <Customer key={id} customer={customer} num={ind + 1} />  
               })}
            </div>
        </div>
    )
}

const mapStateToProps = (store) => {
    return {
        customers: store.customers
    }
}

export default connect(mapStateToProps)(Main)  ;