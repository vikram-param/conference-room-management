import React, { Component } from 'react';
import { Row, Col, Icon, Modal, Form, Input } from 'antd';
import './index.scss';
import "antd/dist/antd.css";

const noOfRooms = 5;
const startTime = 8;
const endTime = 20;
const roomNames = ["Captain America", "Hulk", "Iron Man", "Black Widow", "Hawkeye"];
const isBooked = [];
const initialState = {

    clickedCell: -1,
    lastHover: 0,
    maxCheck: 12,
}
class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
        for (let i = 0; i < 100; i++) {
            let temp = parseInt(Math.random() * 10);
            isBooked.push(temp < 4);
        }
    }

    handleMouseEnter = (e) => {
        if (this.state.clickedCell === -1) {
            return;
        }
        let id = e.target.id;
        let rowNo = parseInt(id / (noOfRooms + 1));
        let colNo;
        let clickedColumn = (this.state.clickedCell) % (noOfRooms + 1);
        let clickedRow = parseInt(this.state.clickedCell / (noOfRooms + 1));

        if (id <= noOfRooms || (id % (noOfRooms + 1)) === 0) {
            return;
        }

        colNo = this.state.lastHover % (noOfRooms + 1);
        console.log("lastHover", this.state.lastHover)
        let lastCell = parseInt(this.state.lastHover / (noOfRooms + 1));
        for (let i = clickedRow; i <= lastCell; i++) {
            let cell = i * (noOfRooms + 1) + colNo;
            console.log("nonhover", cell)
            document.getElementById(cell).style.backgroundColor = "white";
        }
        colNo = id % (noOfRooms + 1);
        if (colNo === clickedColumn && rowNo > clickedRow) {
            for (let i = clickedRow; i <= Math.min(this.state.maxCheck, rowNo); i++) {
                let cell = i * (noOfRooms + 1) + colNo;
                console.log("hover", cell)
                document.getElementById(cell).style.backgroundColor = "green";
            }
            this.setState({ lastHover: Math.min(this.state.maxCheck * (noOfRooms + 1) + colNo, Math.max(this.state.lastHover, e.target.id)) });
        }

    }

    handleClick = (e) => {
        let id = e.target.id;
        let rowNo = parseInt(id / (noOfRooms + 1));
        let colNo = id % (noOfRooms + 1);
        let clickedColumn = (this.state.clickedCell) % (noOfRooms + 1);
        let clickedRow = parseInt(this.state.clickedCell / (noOfRooms + 1));

        if (this.state.clickedCell !== -1) {
            if (rowNo <= this.state.maxCheck && colNo === clickedColumn) {
                this.setState({ visibleRoom: true });
                alert("available")
            }
            else {
                alert("not available");
            }
            colNo = this.state.lastHover % (noOfRooms + 1);
            let lastCell = parseInt(this.state.lastHover / (noOfRooms + 1));
            for (let i = clickedRow; i <= lastCell; i++) {
                let cell = i * (noOfRooms + 1) + colNo;
                console.log("nonhover", cell)
                document.getElementById(cell).style.backgroundColor = "white";
            }
            this.setState(initialState);
            return;
        }
        colNo = id % (noOfRooms + 1);
        let last = 13;
        for (let i = rowNo; i < 12; i++) {
            let cell = i * (noOfRooms + 1) + colNo;
            if (isBooked[cell]) {
                last = i - 1;
                break;
            }
        }
        this.setState({ clickedCell: e.target.id, maxCheck: last });
        console.log("e.target.id", last);
        try {
            document.getElementById(e.target.id).style.backgroundColor = "green";
        } catch (e) {
            console.log(e)
        }
    }

    renderTabs = () => {
        let rowComponent = [], displayIcon, customStyle, className;
        for (let i = 0, cellIndex = 0; i < endTime - startTime; i++) {
            let columnArray = [];
            for (let j = 0; j <= noOfRooms; j++) {
                className = "dashboard__timeCell"
                customStyle = {};

                if (i + j === 0) {
                    displayIcon = "";
                }
                else {
                    if (j === 0) {
                        displayIcon = (startTime + i) % 13 + (startTime + i >= 13) + (startTime + i < 12 ? " AM" : " PM");
                        customStyle.backgroundColor = "#abcaaa"
                    }
                    else {
                        if (i === 0) {
                            displayIcon = roomNames[j - 1];
                            customStyle.backgroundColor = "#999aaa"
                        }
                        else {
                            if (isBooked[cellIndex]) {
                                customStyle.cursor = "not-allowed";
                                className += " dashboard__timeCell__booked";
                                displayIcon = <Icon className="dashboard__timeCell__icon" type="lock" color="red" />
                            }
                            else {
                                customStyle.cursor = "pointer";
                                className += " dashboard__timeCell__open";
                                displayIcon = <Icon className="dashboard__timeCell__icon" type="plus" color="green" />
                            }
                        }
                    }
                }
                columnArray.push(
                    <Col span={4}
                        style={customStyle} align="center"
                        className={className}
                        onClick={this.handleClick}
                        onMouseEnter={this.handleMouseEnter}
                        id={cellIndex++}
                    >
                        {displayIcon}
                    </Col>)
            }
            rowComponent.push(<Row style={{ display: "flex", flexDirection: "row", borderBottom: "0.2px solid gray" }}>{columnArray}</Row>)
        }
        return rowComponent;
    }

    handleCancelBookRoom = () => {
        this.setState({
            clickedCell: -1,
            lastHover: 0,
            maxCheck: 12,
            visibleRoom: false
        });
    }

    handleBookRoom = () => {

    }
    bookRoomModal = () => {
        return <Modal
            title="Add new room"
            visible={this.state.visibleRoom}
            onOk={this.handleBookRoom}
            onCancel={this.handleCancelBookRoom}
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
                    <Input
                        placeholder="Size"
                        onChange={this.setRoomSize}
                    />
                </Form.Item>
            </Form>
        </Modal>
    }
    render() {
        return (
            <div className="dashboard">
                <p className="dashboard__heading">Dashboard</p>
                {this.renderTabs()}
                {this.bookRoomModal()}
            </div>
        )
    }
}

export default Dashboard;
