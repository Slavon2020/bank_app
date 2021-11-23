import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Button from '@material-ui/core/Button';
import { InputLabel, MenuItem, Modal, Select, TextField } from '@material-ui/core';

import { Currency, TCustomer } from '../../types/types';
import { CustomerApi } from '../../api/customerApi';
import { actions } from '../../store/actions';
import AccountAPI from '../../api/accountApi';
import { theme } from '../../styles';
import Account from '../Account/Account';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  editFieldsWrap: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '60%',
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
  createAccBlock: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around'
  },
  btn: {
    marginRight: theme.spacing(2)
  },
  customerField: {
    marginRight: theme.spacing(2)
  }
});

type Props = {
    customer: TCustomer;
};

export default function Customer (props: Props) {
  const { customer } = props;
  const { name, age, email, accounts, id } = customer;
  const [showEditCustomerModal, setSHowEditCustomerModal] = useState(false);
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);
  const [currency, setCurrency] = useState('UAH');
  const dispatch = useDispatch();
  const [localCustomerInfo, setLocalCustomerInfo] = useState({
    name,
    email
  });

  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const toggleEditCustomerModal = () => {
    setSHowEditCustomerModal(prevState => !prevState)
  };

  const toggleCreateAccountModal = () => {
    setShowCreateAccountModal(prevState => !prevState);
  };

  const createAccount = () => {
    AccountAPI.createAccount({
      customerId: id,
      currency: currency as Currency
    }).then(res => {
      dispatch(actions.addAccount({account: res, customerId: id } ));
      setShowCreateAccountModal(false);
    })
  };

  const onInputChange = (field: string, value: string) => {
    setLocalCustomerInfo({
      ...localCustomerInfo,
      [field]: value
    })
  };

  const updateCustomer = () => {
    CustomerApi.updateCustomer({
      id,
      name: localCustomerInfo.name,
      email: localCustomerInfo.email
    }).then(updatedCustomer => {
      dispatch(actions.updateCustomer(updatedCustomer))
    })
  };

  const createAccountBody = () => (
    <div className={classes.editFieldsWrap}>
      <div className={classes.createAccBlock}>
        <InputLabel id="demo-simple-select-label">Currency</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currency}
          onChange={(e) => setCurrency(e.target.value as string)}
        >
          <MenuItem value='UAH'>UAH</MenuItem>
          <MenuItem value='USD'>USD</MenuItem>
          <MenuItem value='EUR'>EUR</MenuItem>
          <MenuItem value='GBP'>GBP</MenuItem>
          <MenuItem value='CHF'>CHF</MenuItem>
        </Select>

        <Button
          size="small"
          variant="contained"
          onClick={createAccount}
        >
          Create account
        </Button>
      </div>
      <Button
          size="small"
          variant="contained"
          onClick={toggleCreateAccountModal}
        >
          Close
      </Button>
    </div>
  );
  
  const editCustomerBody = () => (
    <div className={classes.editFieldsWrap}>
      <div>
        <TextField
        className={classes.customerField}
          label='name:'
          type="text"
          value={localCustomerInfo.name}
          onChange={(e) => onInputChange('name', e.target.value)} 
        />

        <TextField
          label='email:'
          type="text"
          value={localCustomerInfo.email}
          onChange={(e) => onInputChange('email', e.target.value)} 
        />
      </div>
      <div>
        <Button
          className={classes.btn}
          variant="contained"
          color="secondary"
          size="small"
          onClick={updateCustomer}
        >
          Update
        </Button>

        <Button
          className={classes.btn}
          variant="contained"
          color="secondary"
          size="small"
          onClick={toggleEditCustomerModal}
        >
          Close
        </Button>
      </div>
    </div>
  );

  const deleteCustomer = () => {
    CustomerApi.deleteCustomer(id).then(res => {
      dispatch(actions.deleteCustomer(id));
    })
  }

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {name}
        </TableCell>
        
        <TableCell align="right">{email}</TableCell>
        <TableCell align="right">{age}</TableCell>
        <TableCell align="right">{id}</TableCell>
        <TableCell align='right'>
          <Button
              size="small"
              className={classes.btn}
              variant="contained"
              onClick={toggleCreateAccountModal}
            >
            Create
          </Button>
        
          <Button
          size="small"
            className={classes.btn}
            variant="contained"
            color="secondary"
            onClick={toggleEditCustomerModal}
          >
            Edit
          </Button>
        
          <Button
          size="small"
            className={classes.btn}
            variant="contained"
            color="primary"
            onClick={deleteCustomer}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Accounts
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>№</TableCell>
                    <TableCell>Account №</TableCell>
                    <TableCell align="right">Balance</TableCell>
                    <TableCell align="right">Currency</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {accounts && accounts.map((account, index) => (
                    <Account customer={customer} account={account} index={index} key={account.number} />
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <Modal
        open={showEditCustomerModal}
        onClose={toggleEditCustomerModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        {editCustomerBody()}
      </Modal>

      <Modal
        open={showCreateAccountModal}
        onClose={toggleCreateAccountModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        {createAccountBody()}
      </Modal>
      
    </React.Fragment>
  );
}
