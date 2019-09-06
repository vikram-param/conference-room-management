import React from 'react';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import Login from '../container/Login/index';
import AdminDashboard from '../container/Admin-Dashboard';
import 'antd/dist/antd.css';

class Router extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Switch>
				<Route path='/login' component={Login}/>
				<Route path='/admin' component={AdminDashboard} />
			</Switch >
		);
	}
}

export default withRouter(Router);

