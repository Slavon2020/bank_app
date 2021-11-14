import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import CustomerAPI from "../../api/customerApi";
import { actions } from "../../store/actions";
import Account from "../Account/Account";
import CreateAccModal from "../modal/CreateAccModal/CreateAccModal";
import './Customer.scss';

const Customer = (props) => {
    const { customer, num, dispatch, customers } = props;
    const  { id, name, age, email, accounts } = customer;
    const [ localCustomer, setLocalCustomer ] = useState({
        name: '',
        email: ''
    });

    const [isShowCreateAccModal, setIsShowCreateAccModal] = useState(false);

    useEffect(() => {
        setLocalCustomer({name, email});
    }, []);

    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => {
        if(isEditing) {
            CustomerAPI.updateCustomer({
                id,
                ...localCustomer
            })
        }
        setIsEditing(prevState => !prevState)
    }

    const onFieldChange = (field, value) => {
        setLocalCustomer({
            ...localCustomer,
            [field]: value
        })
    };

    const deleteCustomer = (id) => {
        CustomerAPI.deleteCustomer(id)
            .then(res => {
                if (res.deleted) {
                   dispatch(actions.setCustomers(customers.filter(customer => customer.id !== id)))
                }
            })
    }

    return (
        <div className='customer'>
            <div className='info'>
                <div className='num'>{num}.</div>
                <input onChange={(e) => onFieldChange('name', e.target.value)} disabled={!isEditing} type='text' className='name' value={localCustomer.name} />
                <input onChange={(e) => onFieldChange('email', e.target.value)} disabled={!isEditing} type='text' className='email' value={localCustomer.email} />
                <div className='age'>age: {age}</div>
                <div className='id'>id: {id}</div>
                <button onClick={() => setIsShowCreateAccModal(true)} className='btn'>Create account</button>
                <button onClick={toggleEdit} className='btn'>{isEditing ? 'save' : 'edit'}</button>
                <button onClick={() => deleteCustomer(id)} className='btn'>delete</button>
            </div>
            
            <div className='accounts'>
                {accounts && accounts.map((ac, index) => {
                    const { id } = ac;
                    return (
                        <Account key={id} index={index + 1} account={ac} customer={customer} />
                    )
                })}
            </div>

            {isShowCreateAccModal && <CreateAccModal customer={customer} setIsShowCreateAccModal={setIsShowCreateAccModal}/>}
            
            
            {/* <div className='currency'>
                
                <div className='currency-list'>
                        <div>
                            <input onChange={(e) => onChange(e, 'eur')} checked={currency.eur} type="checkbox" id="eur" name="eur" />
                            <label for="eur">EUR</label>
                        </div>
                        <div>
                            <input onChange={(e) => onChange(e, 'usd')} checked={currency.usd} type="checkbox" id="usd" name="usd" />
                            <label for="usd">USD</label>
                        </div>

                        <div>
                            <input onChange={(e) => onChange(e, 'uah')} checked={currency.uah} type="checkbox" id="uah" name="uah" />
                            <label for="scales">UAH</label>
                        </div>
                        <div>
                            <input onChange={(e) => onChange(e, 'gbp')} checked={currency.gbp} type="checkbox" id="gbp" name="gbp" />
                            <label for="gbp">GBP</label>
                        </div>
                        <div>
                            <input onChange={(e) => onChange(e, 'chf')} checked={currency.chf} type="checkbox" id="chf" name="chf" />
                            <label for="chf">CHF</label>
                        </div>
                    </div>
            </div> */}
        </div>
    )
}


const mapStateToProps = (store) => {
    return {
        customers: store.customers
    }
}



export default connect(mapStateToProps)(Customer);