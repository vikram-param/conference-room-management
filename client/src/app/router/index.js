import React from 'react';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import Loader from 'components/loader';
import Authentication from 'containers/auth';
import 'antd/dist/antd.css';

class Router extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Switch>
				<Route path='/loader' component={Loader} />
				<Route path='/auth' component={Authentication} />
			</Switch >
		);
	}
}

export default withRouter(Router);

