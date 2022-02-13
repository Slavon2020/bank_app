import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CreateCustomerForm from '../../components/CreateCustomerForm/CreateCustomerForm';
import CustomersTable from '../../components/CustomersTable/CustomersTable';
import { loadAllCustomers, loadAllEmployers } from '../../store/operations';

const Main = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadAllCustomers());
        dispatch(loadAllEmployers());
    });
  
  return (
   <Fragment>
      <h3>Create customer:</h3>
      <CreateCustomerForm />
      <h3>Customers list:</h3>
      <CustomersTable />
   </Fragment>
  )
}

export default (Main);