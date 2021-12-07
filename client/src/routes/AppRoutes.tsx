import {Route, Switch, Redirect} from 'react-router-dom';
import { Fragment } from "react";
import Main from '../pages/Main/Main';
import Employers from '../pages/Employers/Employers';

const AppRoutes = () => {
    return (
        <Fragment>
			<Switch>
				<Redirect exact from='/' to='main'/>
				<Route path='/main' component={Main} />
                <Route path='/employers' component={Employers} />
			</Switch>
		</Fragment>
    )
}

export default AppRoutes;