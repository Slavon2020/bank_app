import React from 'react';
import { connect } from 'react-redux';
import AccountAPI from '../../api/accountApi';
import { actions } from '../../store/actions';
import './Account.scss';

const Account = (props) => {
    const { account, index, customer, customers, dispatch } = props;
    const { number, balance, currency } = account;

    const deleteAccount = () => {
        AccountAPI.deleteAccount({
            number
        })
        .then(res => {
            const customersWithoutCurrent = customers.filter(cust => cust.id !== customer.id);
            const currentCustomer = {...customer, accounts: customer.accounts.filter(acc => acc.number !== number)}
            dispatch(actions.setCustomers([...customersWithoutCurrent, currentCustomer]))
        })
    }

    return (
        <div className='account'>
            <div className='id'>{index}.</div>
            <div className='number'>account № {number}</div>
            <div className='balance'>balance: {balance}</div>
            <div className='currency'>{currency}</div>
            <button onClick={deleteAccount}>X</button>
        </div>
    )
};

const mapStateToProps = (store) => {
    return {
        customers: store.customers
    }
}

export default connect(mapStateToProps)(Account);