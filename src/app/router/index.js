import React from 'react';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../containers/dashboard';
import 'antd/dist/antd.css';

class Router extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Switch>
				<Route path='/dashboard' component={Dashboard} />
			</Switch >
		);
	}
}

export default withRouter(Router);

