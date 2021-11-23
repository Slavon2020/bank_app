
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { TCustomer, STORE } from '../../types/types';
import { connect } from 'react-redux';
import Customer from '../Customer/Customer';


type PropsFromRedux = {
  customers: Array<TCustomer>
}

const CollapsibleTable = (props: PropsFromRedux) => {
  const { customers } = props;

  return (
    <TableContainer component={Paper}>

      <Table aria-label="collapsible table">

        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="right">email</TableCell>
            <TableCell align="right">age</TableCell>
            <TableCell align="right">id</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
        {customers && customers.map((customer: TCustomer) => (
          <Customer key={customer.email} customer={customer} />
        ))}
        </TableBody>

      </Table>

    </TableContainer>
  );
}

const mapStateToProps = (store: STORE) => {
  return {
    customers: store.customers
  }
}

export default connect(mapStateToProps)(CollapsibleTable);
