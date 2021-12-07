import { Button, createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.spacing(2),
        backgroundColor: '#1976D2' 
    },
    navLink: {
        marginRight: theme.spacing(2),
        textDecoration: 'none'
    }
  }),
  {
    name: 'header'
  }
);

const Header = () => {
    const classes = useStyles();
    return (
        <header className={classes.header}>
            <Typography>Logo</Typography>
            <nav>
                <NavLink className={classes.navLink} to='/main'>Main</NavLink>
                <NavLink className={classes.navLink} to='/employers'>Employers</NavLink>
                <Button variant="contained">Logout</Button>
            </nav>
        </header>
    )
}

export default Header;