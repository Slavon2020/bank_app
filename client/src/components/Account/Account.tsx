import React, { Fragment, useState } from 'react';
import { Button, makeStyles, MenuItem, Modal, Select, TableCell, TableRow, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { TCurrency, TAccount, TCustomer } from '../../types/types';
import { theme } from '../../styles';
import { removeAccount, transfer, updateAccount } from '../../store/operations';

const useStyles = makeStyles({
  editFieldsWrap: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '75%',
    minHeight: '50%',
    borderRadius: 5,
    padding: '30px 20px',
    border: '2px solid orange'
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  customerInfo: {
    marginRight: theme.spacing(3)
  },
  editAccTop: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '80%'
  },
  updateBalance: {
    display: 'flex',
    alignItems: 'center'
  },
  updateBalanceBtn: {
    marginLeft: theme.spacing(3)
  },
  transferSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%'
  },
  transferBlock: {
    marginTop: theme.spacing(2),
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  transfer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '15%'
  },
  transferAcc: {
    width: '40%',
    maxWidth: '40%',
    boxSizing: 'border-box'
  },
  transferBtn: {
    marginTop: theme.spacing(2)
  }
});

type Props = {
    account: TAccount;
    index: number;
    customer: TCustomer
};

const Account = (props: Props) => {
  const { index, account, customer } = props;
  const dispatch = useDispatch();
  const { number, balance, currency } = account;
  const [newBalance, setNewBalance] = useState(0);
  const { name, email, age, id, accounts } = customer;
  const [showEditAccModal, setShowEditAccModal] = useState(false);
  const [transferSum, setTransferSum] = useState(0);
  const [transferAccountTo, setTransferAccountTo] = useState({
    number: '',
    balance: 0,
    currency: '' as TCurrency,
  });
  const classes = useStyles();

  const onNewBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (+value >= 0) {
      setNewBalance(+value);
    }
  }

  const onTransferSumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (transferAccountTo.number === '') return;
    
    const value = +e.target.value;
    if (value >= 0 && value <= balance) {
      setTransferSum(value);
    }
  }

  const onTransferAccChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const accNumber = e.target.value;
    const choosedAccTransferTo = accounts?.find(acc => acc.number === accNumber);
    choosedAccTransferTo && setTransferAccountTo(choosedAccTransferTo);
  }

  const getAccountsToTransfer = () => {
    const accountsToTransfer = accounts?.filter(acc => acc.number !== number);
    return accountsToTransfer?.map(acc => {
      const { number } = acc;
          const value = acc.number + ' ' + acc.balance + ' ' + acc.currency;
          return (
            <MenuItem key={number} value={number}>{value}</MenuItem>
          )
        })
  }

  const transferMoney = () => {
    dispatch(transfer(
        number,
        transferSum,
        transferAccountTo.number,
        transferSum,
        account,
        customer.id as number,
        transferAccountTo,
        setTransferAccountTo
    ))

    setTransferSum(0);
  }

  const deleteAccount = () => {
    dispatch(removeAccount(id as number, account));
    }

  const updateBalance = () => {
    dispatch(updateAccount(account.id as number, newBalance));
  }
  
  const editAccountBody = () => {
    return (
      <div className={classes.editFieldsWrap}>
        <div className={classes.editAccTop}>
          <div className={classes.customerInfo}>
            <h3>Customer info:</h3>
            <p>Name: {name};</p>
            <p>email: {email}; </p>
            <p>age: {age}</p>
          </div>

          <div>
            <h3>Edit balance</h3>
            <p>Account number: {number}</p>
            <p>Current balance: {balance} {currency}</p>
            <div className={classes.updateBalance}>
              <TextField
                type='number'
                id="balance"
                label="Set new balance:"
                variant="outlined"
                value={newBalance}
                onChange={onNewBalanceChange}
              />
              <Button
                className={classes.updateBalanceBtn}
                color="secondary"
                onClick={updateBalance}
              >
                  Update balance
              </Button>
            </div>
          </div>
        </div>
        
        <div className={classes.transferSection}>
          <h3>Money transfer</h3>
          <div className={classes.transferBlock}>
            <div className={classes.transferAcc}>
              <h4>From account:</h4>
              <p>Account №: {number}</p>
              <p>Current balance: {balance} {currency}</p>
              <p>Balance after transfer: {balance - transferSum} {currency}</p>
            </div>
            <div className={classes.transfer}>
              <TextField
                  type='number'
                  id="balance"
                  label="Transfer sum:"
                  variant="outlined"
                  value={transferSum}
                  onChange={onTransferSumChange}
              />
              <Button
                disabled={transferAccountTo.number === '' || transferSum === 0}
                className={classes.transferBtn}
                color="secondary"
                onClick={transferMoney}>
                  Transfer
              </Button>
            </div>
            
            <div className={classes.transferAcc}>
              <h4>To account:</h4>
              <Select
                value={transferAccountTo.number}
                onChange={(e) => onTransferAccChange(e)}
              >
                {getAccountsToTransfer()}
              </Select>
              <p>Current balance: {transferAccountTo.balance} {transferAccountTo.currency}</p>
              <p>Balance after transfer: {Number(transferSum) + Number(transferAccountTo.balance)} {transferAccountTo.currency}</p>
            </div>
          </div>
        </div>
        <Button color="primary" onClick={() => setShowEditAccModal(false)}>Close</Button>
      </div>
    )
  }

  const toggleShowEditCustomerModal = () => {
    setShowEditAccModal(prevState => !prevState);
  }

  return (
    <Fragment>
      <TableRow key={number}>
        <TableCell component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell>{number}</TableCell>
        <TableCell align="right">{balance}</TableCell>
        <TableCell align="right">
          {currency}
        </TableCell>
        <TableCell align="right">
        <Button color="secondary" onClick={toggleShowEditCustomerModal}>Edit</Button>
        <Button color="primary" onClick={deleteAccount}>X</Button>
        </TableCell>
      </TableRow>

      <Modal
        open={showEditAccModal}
        onClose={toggleShowEditCustomerModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        {editAccountBody()}
      </Modal>
    </Fragment>
  )
}

export default Account;