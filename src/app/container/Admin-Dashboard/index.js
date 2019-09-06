import React, { Component } from 'react';
import { Row, Col, Modal, Button, Form, Input, Icon, Select } from 'antd';
import * as postUtils from '../../utils/post';
import './index.scss';

class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleRoom: false,
            visibleUser: false,
            userName: '',
            userPassword: '',
            roomId: '',
            roomName: '',
            utils: [],
            size: 0,
            userEmail: '',
            userId: '',
            role: "0"
        }
    }

    componentWillMount() {

    }

    addRoom = () => {
        this.setState({
            visibleRoom: true
        })
    }

    addUser = () => {
        this.setState({
            visibleUser: true
        })
    }

    handleCancelUser = () => {
        this.setState({
            visibleUser: false,
            userName: '',
            userPassword: '',
            userEmail: '',
            userId: ''
        })
    }

    handleOkUser = () => {
        this.setState({
            visibleUser: false
        },() => {
            postUtils.createUser(this.state.userId, this.state.userName, this.state.userPassword, this.state.userEmail, this.state.role).then((response => {
                console.log(response);
            }))
        })
    }

    handleCancelRoom = () => {
        this.setState({
            visibleRoom: false,
            roomId: '',
            roomName: '',
            utils: [],
            size: 0
        })
    }

    handleOkRoom = () => {
        this.setState({
            visibleRoom: false
        });
    }

    setRoomId = (e) => {
        this.setState({
            roomId: e.target.value
        })
    }

    setRoomName = (e) => {
        this.setState({
            roomName: e.target.value
        })
    }

    setRoomSize = (e) => {
        this.setState({
            roomSize: e.target.value
        })
    }

    setUtilites = (value) => {
        this.setState({
            utils: value
        })
    }

    addRoomModal = () => {
        return <Modal
            title="Add new room"
            visible={this.state.visibleRoom}
            onOk={this.handleOkRoom}
            onCancel={this.handleCancelRoom}
        >
            <Form>
                <Form.Item>
                    <Input
                        placeholder="Room Id"
                        onChange={this.setRoomId}
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        placeholder="Room Name"
                        onChange={this.setRoomName}
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        placeholder="Size"
                        onChange={this.setRoomSize}
                    />
                </Form.Item>
                <Form.Item>
                    <Select onChange={this.setUtilites} mode="multiple" placeholder="Utilities">
                        <Option value="projector">Projector</Option>
                        <Option value="tv">Smart TV</Option>
                        <Option value="ac">AC</Option>
                        <Option value="board">White Board</Option>
                        <Option value="water">Water</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    }

    roleChange = (value) => {
        this.setState({
            role: value
        })
    }

    setUserName = (e) => {
        this.setState({
            userName: e.target.value
        })
    }

    setPassword = (e) => {
        this.setState({
            userPassword: e.target.value
        })
    }

    setuserId = (e) => {
        this.setState({
            setuserId: e.target.value
        })
    }

    setUserEmail = (e) => {
        this.setState({
            userEmail: e.target.value
        })
    }

    setUseruserId = (e) => {
        this.setState({
            userId: e.target.value
        })
    }

    addUserModal = () => {
        return <Modal
            title="Add new user"
            visible={this.state.visibleUser}
            onOk={this.handleOkUser}
            onCancel={this.handleCancelUser}
        >
            <Form>
                <Form.Item>
                    <Input
                        prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Employee Id"
                        onChange={this.setUseruserId}
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                        onChange={this.setUserName}
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Email"
                        onChange={this.setUserEmail}
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                        onChange={this.setPassword}
                    />
                </Form.Item>
                <Form.Item>
                    <Select onChange={this.roleChange} placeholder="Role">
                        <Option value={1}>Project Manager</Option>
                        <Option value={2}>Management</Option>
                        <Option value={3}>Employee</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    }

    render() {
        return (
            <div className="mainPage">
                <div style={{ textAlign: 'center' }}>
                    <Row className="welcomePage" gutter={24}>
                        <Col span={24} align="middle">
                            <h1 className="welcome">Welcome</h1>
                        </Col>
                        <Col xl={12} lg={12} sm={24} md={12} xs={24} align="middle">
                            <div className="portfolioBox">
                                <Button className="welcomeButton" type="primary" onClick={this.addRoom}>Add Room</Button>
                            </div>
                        </Col>
                        <Col xl={12} lg={12} sm={24} md={12} xs={24} align="middle">
                            <div className="portfolioBox">
                                <Button className="welcomeButton" type="primary" onClick={this.addUser}>Add User</Button>
                            </div>
                        </Col>
                    </Row>
                    {this.addRoomModal()}
                    {this.addUserModal()}
                </div>
            </div>
        )
    }
}

export default AdminDashboard;