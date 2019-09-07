import React, { Component } from 'react';
import { Row, Col, Icon, Modal, Form, Input, message } from 'antd';
import './index.scss';
import "antd/dist/antd.css";
import * as getUtils from '../../utils/get';

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

    async componentDidMount(){
        let roomContents = await getUtils.getRooms();
        console.log("roomcontents", roomContents)
    }

    handleMouseEnter = (e) => {
        if (this.state.clickedCell === -1) {
            return;
        }
        let id = e.target.id;
        let rowNo = parseInt(id / (noOfRooms));
        let colNo;
        let clickedColumn = (this.state.clickedCell) % (noOfRooms);
        let clickedRow = parseInt(this.state.clickedCell / (noOfRooms));

        // if (id <= noOfRooms || (id % (noOfRooms)) === 0) {
        //     return;
        // }

        colNo = this.state.lastHover % (noOfRooms);
        // console.log("lastHover", this.state.lastHover)
        let lastCell = parseInt(this.state.lastHover / (noOfRooms));
        for (let i = clickedRow; i <= lastCell; i++) {
            let cell = i * (noOfRooms) + colNo;
            // console.log("nonhover", cell)
            document.getElementById(cell).style.backgroundColor = "white";
        }
        colNo = id % (noOfRooms);
        if (colNo === clickedColumn && rowNo > clickedRow) {
            for (let i = clickedRow; i <= Math.min(this.state.maxCheck, rowNo); i++) {
                let cell = i * (noOfRooms) + colNo;
                // console.log("hover", cell)
                document.getElementById(cell).style.backgroundColor = "green";
            }
            this.setState({ lastHover: Math.min(this.state.maxCheck * (noOfRooms) + colNo, Math.max(this.state.lastHover, e.target.id)) });
        }

    }

    handleClick = (e) => {
        console.log(e.target.id);
        if (isBooked[e.target.id] && this.state.clickedCell === -1) {
            message.error("Already booked");
            return;
        }
        let id = e.target.id;
        let rowNo = parseInt(id / (noOfRooms));
        let colNo = id % (noOfRooms);
        let clickedColumn = (this.state.clickedCell) % (noOfRooms);
        let clickedRow = parseInt(this.state.clickedCell / (noOfRooms));

        if (this.state.clickedCell !== -1) {
            if (rowNo <= this.state.maxCheck && colNo === clickedColumn) {
                this.setState({ visibleRoom: true, secondClickedCell: e.target.id, firstClickedCell: this.state.clickedCell });
                console.log(this.state.clickedCell, e.target.id);
            }
            // else {
            //     alert("not available");
            // }
            colNo = this.state.lastHover % (noOfRooms);
            let lastCell = parseInt(this.state.lastHover / (noOfRooms));
            for (let i = clickedRow; i <= lastCell; i++) {
                let cell = i * (noOfRooms) + colNo;
                // console.log("nonhover", cell)
                document.getElementById(cell).style.backgroundColor = "";
            }
            this.setState(initialState);
            return;
        }
        colNo = id % (noOfRooms);
        let last = 13;
        for (let i = rowNo; i < 12; i++) {
            let cell = i * (noOfRooms) + colNo;
            if (isBooked[cell]) {
                last = i - 1;
                break;
            }
        }
        this.setState({ clickedCell: e.target.id, maxCheck: last });
        try {
            document.getElementById(e.target.id).style.backgroundColor = "green";
        } catch (e) {
            console.log(e)
        }
    }

    renderTabs = () => {
        let rowComponent = [], displayIcon, customStyle, className, cellId;
        for (let i = 0, cellIndex = 0; i < endTime - startTime; i++) {
            let columnArray = [];
            for (let j = 0; j <= noOfRooms; j++) {
                className = "dashboard__timeCell"
                cellId = "extra";
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
                            cellId = cellIndex++;
                        }
                    }
                }
                columnArray.push(
                    <Col span={4}
                        style={customStyle} align="center"
                        className={className}
                        onClick={this.handleClick}
                        onMouseEnter={this.handleMouseEnter}
                        id={cellId}
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

    format(str){
        str = "00"+str;
        return str.substr(-2);
    }

    handleBookRoom = () => {
        let bookingStart = this.state.firstClickedCell;
        let bookingEnd = this.state.secondClickedCell;
        console.log(bookingStart, bookingEnd);
        let today = localStorage.getItem("selectedDate") || new Date();
        let roomNo = (bookingStart) % noOfRooms;
        bookingStart = startTime+parseInt(bookingStart / noOfRooms)+1;
        bookingEnd = startTime+parseInt(bookingEnd / noOfRooms)+1;
        let startBookingTime = today.getFullYear() + "-" + this.format(today.getMonth()) + "-" + this.format(today.getDate()) + " " + this.format(bookingStart)+":00:00:000000";
        let endBookingTime = today.getFullYear() + "-" + this.format(today.getMonth()) + "-" + this.format(today.getDate()) + " " + this.format(bookingEnd)+":00:00:000000";
        console.log(startBookingTime, endBookingTime);
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
                        placeholder="Agenda of Meeting"
                        onChange={this.setRoomName}
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