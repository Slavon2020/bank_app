import { useState } from "react";
import { Button, createStyles, makeStyles, TextField, Theme } from "@material-ui/core";

import { TEmployer } from "../../types/types";
import EmployerApi from "../../api/employerApi";
import { useDispatch } from "react-redux";
import { actions } from "../../store/actions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '60%'
    }
  }),
  {
    name: 'employer'
  }
);

type Props = {
    employer: TEmployer,
    index: number;
}

const Employer = (props: Props) => {
    const {employer, index} = props;
    const { name, address, id } = employer;
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [localEmployerData, setLocalEmployerData] = useState({
        name,
        address
    })
    
    const handleEditBtn = () => {
        if (isEditing) {
            EmployerApi.update({
                name: localEmployerData.name,
                address: localEmployerData.address,
                id
            })
        }
        setIsEditing(prevState => !prevState);
    }

    const onFieldChange = (field: string, value: string) => {
        setLocalEmployerData({
            ...localEmployerData,
            [field]: value
        });
    }

    const deleteEmployer = () => {
        EmployerApi.delete(id).then(res => {
            if (res.deleted) {
                dispatch(actions.deleteEmployer(id));
            }
        })
    }

    return (
        <div className={classes.root}>
            <span>{index}.</span>
            <TextField 
                disabled={!isEditing} 
                value={localEmployerData.name} 
                label="name"
                onChange={(e) => onFieldChange('name', e.target.value)}
            />
            <TextField
                disabled={!isEditing}
                value={localEmployerData.address}
                label="address"
                onChange={(e) => onFieldChange('address', e.target.value)}
            />
            <Button 
                variant="contained" 
                color="secondary"
                onClick={handleEditBtn}>
                {isEditing ? 'Save' : 'Edit'}
            </Button>
            <Button 
                variant="contained" 
                color="secondary"
                onClick={deleteEmployer}>
                Delete
            </Button>
        </div>
    )
}

export default Employer;