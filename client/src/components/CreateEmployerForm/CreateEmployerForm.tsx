import { useState } from "react";

import { Button, createStyles, makeStyles, TextField, Theme } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import EmployerApi from "../../api/employerApi";
import { useDispatch } from "react-redux";
import { actions } from "../../store/actions";

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
    name: 'employerForm'
  }
);

const CreateEmployerForm = () => {

    const classes = useStyles();
    const initialEmployer = {
        name: '',
        address: ''
    }
    const [employer, setEmployer] = useState(initialEmployer);
    const dispatch = useDispatch();
    
    const onSubmit = (e: any) => {
        e.preventDefault();
        EmployerApi.createEmployer(employer).then(res => {
            dispatch(actions.saveEmployer(res));
        });
        setEmployer(initialEmployer);
    }

    const onFieldChange = (field: string, value: string) => {
        setEmployer({
            ...employer,
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
                value={employer.name}
                required={true}
                />
                <TextField
                id="outlined-error-helper-text"
                label="address"
                variant="outlined"
                onChange={(e) => onFieldChange('address', e.target.value)}
                value={employer.address}
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
    )
}

export default CreateEmployerForm;