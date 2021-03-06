import { useState } from 'react';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

import { STORE, TEmployer } from '../../types/types';
import { saveCustomer } from '../../store/operations';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    }
  }),
  {
    name: 'customerForm'
  }
);

type PropsFromRedux = {
  employers: Array<TEmployer>;
}

const CreateCustomerForm = (props: PropsFromRedux) => {
  const classes = useStyles();

  const initialCustomerFields = {
    name: '',
    email: '',
    age: 0,
}

  const [ customer, setCustomer ] = useState(initialCustomerFields);

  const onSubmit = (e: React.SyntheticEvent) => {
      e.preventDefault();
      saveCustomer(customer);
      setCustomer(initialCustomerFields);
  }

    const onFieldChange = (field: string, value: string | number) => {
        setCustomer({
            ...customer,
            [field]: value
        })
    }

  return (
    <form onSubmit={onSubmit} className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="outlined-error"
          label="Name"
          variant="outlined"
          onChange={(e) => onFieldChange('name', e.target.value)}
          value={customer.name}
          required={true}
        />
        <TextField
          id="outlined-error-helper-text"
          label="email"
          variant="outlined"
          onChange={(e) => onFieldChange('email', e.target.value)}
          value={customer.email}
          required={true}
        />
        <TextField
          id="outlined-error-helper-text"
          label="age"
          variant="outlined"
          type='number'
          onChange={(e) => onFieldChange('age', e.target.value)}
          value={customer.age}
          required={true}
        />

      </div>

      <Button
        variant="contained"
        startIcon={<SaveIcon />}
        type='submit'
        size='small'
      >
        Save
      </Button>
    </form>
  );
}

const mapStateToProps = (state: STORE) => {
  return {
    employers: state.employers
  }
}

export default connect(mapStateToProps)(CreateCustomerForm);