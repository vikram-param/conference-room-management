import React from 'react';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import { Layout, Menu, Icon, Affix } from 'antd';
import Dashboard from '../containers/dashboard';
import Login from '../container/Login/index';
import AdminDashboard from '../container/Admin-Dashboard';
import Navigator from '../components/navigator';
import 'antd/dist/antd.css';
import './index.scss'
import MyBookings from '../container/My-Bookings';

const { Header, Content, Footer, Sider } = Layout;
class Router extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showNavBar: true
		}
	}
	componentDidMount() {
		if (localStorage.getItem('role') === undefined || localStorage.getItem('role') === null || localStorage.getItem('userId') === null || localStorage.getItem('userId') === undefined) {
			this.props.history.push('/login');
		}
		else{
			this.props.history.push('/book')
		}
	}
	componentWillReceiveProps() {

	}
	getCurrentPage() {
		let hash = window.location.hash;
		hash = hash.replace("#", "")
		hash = hash.split('?')[0];
		return hash;
	}

	isLoginPage() {
		const currentPage = this.getCurrentPage();
		return currentPage === "" || currentPage === "/login"
	}

	isAdmin = () => {
		if (parseInt(localStorage.getItem("role")) === 0) {
			return true;
		}
		return false;
	}

	render() {
		return (
			<Layout className="uiContainer">
				<Layout className="mainLayout">
					{this.isLoginPage() ? null : <Navigator isAdmin={this.isAdmin()} />}
					<Content style={{ overflow: 'initial', marginLeft: "256px" }}>
						<Switch>
							<Route path='/book' component={Dashboard} />
							<Route path='/login' component={Login} />
							<Route path='/admin' component={AdminDashboard} />
							<Route path='/bookings' component={MyBookings} />
						</Switch >
					</Content>
				</Layout>
			</Layout>
		);
	}
}

export default withRouter(Router);

