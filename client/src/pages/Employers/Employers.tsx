import { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Typography } from '@material-ui/core';

import CreateEmployerForm from '../../components/CreateEmployerForm/CreateEmployerForm'
import EmployersList from '../../components/EmployersList/EmployersList'
import { STORE, TEmployer } from '../../types/types';
import {getAllEmployers} from "../../store/operations";

type PropsFromRedux = {
    employers: Array<TEmployer>;
    dispatch: Dispatch<any>;
}

const Employers = (props: PropsFromRedux) => {
    const { employers, dispatch } = props;
    useEffect(() => {
        dispatch(getAllEmployers());
    }, [])
    return (
        <div>
            <Typography variant='h5'>Create employer</Typography>
            <CreateEmployerForm />
            <EmployersList employers={employers} />
        </div>
    )
}

const mapStateToProps = (state: STORE) => {
    return {
        employers: state.employers
    }
}

export default connect(mapStateToProps)(Employers);