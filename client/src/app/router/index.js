import React from 'react';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';

class Router extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Switch>
			</Switch >
		);
	}
}

export default withRouter(Router);

