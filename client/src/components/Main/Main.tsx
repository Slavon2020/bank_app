import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CustomerApi } from "../../api/customerApi";
import EmployerApi from "../../api/employerApi";
import { actions } from "../../store/actions";
import CreateCustomerForm from "../CreateCustomerForm/CreateCustomerForm";
import CreateEmployerForm from "../CreateEmployerForm/CreateEmployerForm";
import CustomersTable from "../CustomersTable/CustomersTable";

const Main = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    CustomerApi.getAllCustomers().then(customers => {
      dispatch(actions.setCustomers(customers))
    })
    EmployerApi.getEmployers().then(employers => {
      dispatch(actions.setEmployers(employers));
    })
  });
  
  return (
   <Fragment>
      <h3>Create employer:</h3>
      <CreateEmployerForm />
      <h3>Create customer:</h3>
      <CreateCustomerForm />
      <h3>Customers list:</h3>
      <CustomersTable />
   </Fragment>
  )
}

export default Main;