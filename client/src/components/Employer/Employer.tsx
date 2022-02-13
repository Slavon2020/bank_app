import { useState } from 'react';
import { Button, createStyles, makeStyles, TextField, Theme } from '@material-ui/core';

import { TEmployer } from '../../types/types';
import { useDispatch } from 'react-redux';
import { removeEmployer, updateEmployer } from '../../store/operations';

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
            updateEmployer(localEmployerData.name, localEmployerData.address, id )
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
        dispatch(removeEmployer(id));
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