import React, { Component } from 'react';
import { Row, Col, Modal, Button, Form, Input, Icon, Select, Card } from 'antd';
import * as postUtils from '../../utils/post';
import * as getUtils from '../../utils/get';
import './index.scss';
const { Option } = Select;

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
            roomSize: 0,
            userEmail: '',
            userId: '',
            role: "0",
            rooms: []
        }
    }

    async componentWillMount() {
        let data = await getUtils.getRooms();
        this.setState({
            rooms: data.content
        })
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
        }, () => {
            postUtils.createUser(this.state.userId, this.state.userName, this.state.userPassword, this.state.userEmail, this.state.role).then((response => {
                console.log(response);
            })).catch(err => {
                console.log(err);
            })
        })
    }

    handleCancelRoom = () => {
        this.setState({
            visibleRoom: false,
            roomId: '',
            roomName: '',
            utils: [],
            roomSize: 0
        })
    }

    handleOkRoom = () => {
        this.setState({
            visibleRoom: false
        }, () => {
            postUtils.createRoom(this.state.roomName, this.state.utils, this.state.roomSize).then(response => {
                console.log(response);
            }).catch(err => {
                console.log(err);
            })
        });
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
            userId: e.target.value
        })
    }

    setUserEmail = (e) => {
        this.setState({
            userEmail: e.target.value
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
                        onChange={this.setuserId}
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

    renderCards = () => {
        // debugger
        let cards = [];

        for (let i = 0; i < this.state.rooms.length; i++) {
            cards.push(
                <Col className="gutter-row" xl={8} lg={8} md={12} sm={12} xs={12} >
                    <div>
                        <div className="dcard">
                            <center>
                                <Card title={this.state.rooms[i].roomName} bordered={false} style={{ width: 300, margin: 10, boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
                                    {this.state.rooms[i].utilityWater ? "Water Available" : null}
                                    <br />
                                    {this.state.rooms[i].utilityWBoard ? "White Board Available" : null}
                                    <br />
                                    {this.state.rooms[i].utilityAC ? "AC Available" : null}
                                    <br />
                                    {this.state.rooms[i].utilityProjector ? "Projector Available" : null}
                                    <br />
                                    {this.state.rooms[i].utilitySmTv ? "Smart Available" : null}
                                    <br />
                                </Card>
                            </center>
                        </div>
                    </div>
                </Col>)
        }
        return cards;
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
                <div style={{width: "60%", margin: "0 auto"}}>
                {this.renderCards()}
                </div>
            </div>
        )
    }
}

export default AdminDashboard;