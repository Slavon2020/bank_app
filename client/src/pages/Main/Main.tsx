import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CustomerApi } from "../../api/customerApi";
import EmployerApi from "../../api/employerApi";
import { actions } from "../../store/actions";
import CreateCustomerForm from "../../components/CreateCustomerForm/CreateCustomerForm";
import CustomersTable from "../../components/CustomersTable/CustomersTable";

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
      <h3>Create customer:</h3>
      <CreateCustomerForm />
      <h3>Customers list:</h3>
      <CustomersTable />
   </Fragment>
  )
}

export default Main;