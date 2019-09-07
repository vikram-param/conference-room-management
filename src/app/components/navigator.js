import { Menu, Icon } from 'antd';
import React from 'react';
import { withRouter } from 'react-router';

class Navigator extends React.Component {
    state = {
        openKeys: ['sub1'],
    };

    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    logOut = () => {
        localStorage.clear();
        this.props.history.push("/login")
    }

    adminDashboard = () => {
        this.props.history.push('/admin')
    }

    dashboard = () => {
        this.props.history.push('/dashboard')
    }

    render() {
        return (
            <Menu
                mode="inline"
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
                style={{ width: 256, position: "absolute", height: "100vh" }}
            >
                <Menu.Item key="1" onClick={this.dashboard}>
                    <Icon type="dashboard" />
                    Dashboard
                </Menu.Item>
                {this.props.isAdmin ? <Menu.Item key="2" onClick={this.adminDashboard}>
                    <Icon type="user" />
                    Admin Dashboard
                </Menu.Item> : null}
                <Menu.Item key="3" onClick={this.logOut}>
                    <Icon type="setting" />
                    Log Out
                </Menu.Item>
            </Menu>
        );
    }
}
export default withRouter(Navigator);