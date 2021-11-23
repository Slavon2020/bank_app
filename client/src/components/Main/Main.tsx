import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CustomerApi } from "../../api/customerApi";
import { actions } from "../../store/actions";
import ValidationTextFields from "../CreateCustomerForm/CreateCustomerForm";
import CollapsibleTable from "../CustomersTable/CustomersTable";

const Main = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    CustomerApi.getAllCustomers().then(customers => {
      dispatch(actions.setCustomers(customers))
    })
  });
  
  return (
   <Fragment>
      <h3>Create customer:</h3>
      <ValidationTextFields />
      <h3>Customers list:</h3>
      <CollapsibleTable />
   </Fragment>
  )
}

export default Main;