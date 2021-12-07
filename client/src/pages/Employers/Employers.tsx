import { Typography } from "@material-ui/core";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import EmployerApi from "../../api/employerApi";
import CreateEmployerForm from "../../components/CreateEmployerForm/CreateEmployerForm"
import EmployersList from "../../components/EmployersList/EmployersList"
import { actions } from "../../store/actions";
import { STORE, TEmployer } from "../../types/types";

type PropsFromRedux = {
    employers: Array<TEmployer>;
    dispatch: Dispatch;
}

const Employers = (props: PropsFromRedux) => {
    const { employers, dispatch } = props;
    useEffect(() => {
        EmployerApi.getEmployers().then(res => {
            dispatch(actions.setEmployers(res));
        })
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