import React, { Component } from 'react';
import { Row, Col, Icon, Modal, Form, Input, message, Select } from 'antd';
import './index.scss';
import "antd/dist/antd.css";
import * as getUtils from '../../utils/get';
import * as postUtils from '../../utils/post';

var noOfRooms
var startTime = 8;
var endTime = 20;
var roomNames = [];
var isBooked = [];
const initialState = {

    clickedCell: -1,
    lastHover: 0,
    maxCheck: 12,
    agendaText: ""
}
var todayDate = new Date();

todayDate = todayDate.getFullYear() + "-" + ('0' + (todayDate.getMonth() + 1)).slice(-2) + "-" + ('0' + todayDate.getDate()).slice(-2) + " " + ('0' + todayDate.getHours()).slice(-2) + ":" + ('0' + todayDate.getMinutes()).slice(-2) + ":" + ('0' + todayDate.getSeconds()).slice(-2)+".000000";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
        var now = new Date();
        var daysOfYear = [], j = 0;
        for (var d = new Date(now.getFullYear(), now.getMonth(), now.getDate()); j < 30; d.setDate(d.getDate() + 1), j++) {
            var temp = new Date(d);
            temp = temp.toDateString();
            // temp = temp.split(' ');
            // temp = ""+temp[1]+" "+temp[2];
            daysOfYear.push(temp);
        }
        this.daysOfYear = daysOfYear;
    }

    async componentDidMount() {
        console.log("lsddf", this.daysOfYear[0]);
        this.setState({ formatDate: this.daysOfYear[0], showLoader: true });
        let roomContents = await getUtils.getRooms();
        this.filterOnDate();
        noOfRooms = roomContents.content.length;
        for (let i = 0; i < noOfRooms; i++) {
            roomNames.push(roomContents.content[i].roomName);
        }
        this.setState({ roomInfo: roomContents.content, visibleRoom: false });
    }

    filterOnDate = async () => {
        isBooked = new Array(100).fill(false);
        let self = localStorage.getItem('userId');
        let allBookings = await getUtils.getBookingsByUser(self), startBookTime, endBookTime, colNo, rowNo, cell;
        allBookings = allBookings.content;
        for (let i = 0; i < allBookings.length; i++) {
            let foundDate = allBookings[i].startTime.split('T')[0].substr(-5);
            foundDate = months[parseInt(foundDate.split('-')[0]) - 1] + " " + foundDate.split('-')[1];
            // startBookTime = ""+this.getMonth(startBookTime[1])+ " " +startBookTime[2];
            if (this.state.formatDate.includes(foundDate) && allBookings[i].historyState === 0) {

                startBookTime = allBookings[i].startTime;
                startBookTime = startBookTime.split('T')[1].split(':')[0];
                endBookTime = allBookings[i].endTime;
                endBookTime = endBookTime.split('T')[1].split(':')[0];
                colNo = allBookings[i].roomId_id - 1;
                rowNo = startBookTime - startTime - 1;
                for (let j = startBookTime, k = 0; j <= endBookTime; j++ , k++) {
                    cell = (rowNo + k) * noOfRooms + colNo;
                    if (cell > 0)
                        isBooked[cell] = true;
                }
            }
            this.setState({ showLoader: false });

        }
    }

    changeDate = (value) => {
        this.setState({ formatDate: value, showLoader: true },()=>{
            this.filterOnDate();
        });
    }

    renderOptions = () => {
        let arrayOptions = [];
        for (let i = 0; i < 30; i++) {
            let temp = this.daysOfYear[i];
            temp = temp.split(' ');
            temp = "" + temp[1] + " " + temp[2];
            arrayOptions.push(
                <Option value={this.daysOfYear[i]}>{temp}</Option>
            )
        }
        return arrayOptions;
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
            document.getElementById(cell).style.backgroundColor = "";
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
        if (e.target.id === "") {
            return;
        }
        if (isBooked[e.target.id] && this.state.clickedCell === -1) {
            message.error("Not available");
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
            }
            else {
                message.error("Not available");
            }
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
        this.setState({ clickedCell: e.target.id, maxCheck: last, agendaText: "" });
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
                customStyle = { borderBottom: "0.2px solid gray" };

                if (i + j === 0) {
                    displayIcon = <Select onChange={this.changeDate} defaultValue={this.state.formatDate} style={{ width: 240 }}>{this.renderOptions()}</Select>
                    customStyle.backgroundColor = "#abcaaa"
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
            rowComponent.push(<Row align="center">{columnArray}</Row>)
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

    format(str) {
        str = "00" + str;
        return str.substr(-2);
    }

    getMonth=(month)=>{
        for(let i = 0; i < 12; i++){
            if(months[i] === month){
                return i+1;
            }
        }
        return 12;
    }

    handleBookRoom = () => {
        this.setState({visibleRoom: false, showLoader: true},()=>{
            let bookingStart = this.state.firstClickedCell;
            let bookingEnd = this.state.secondClickedCell;
            let self = localStorage.getItem("userId")
    
            let today = this.state.formatDate;
            today = today.split(' ');
            let roomNo = ((bookingStart) % noOfRooms)+1;
            bookingStart = startTime + parseInt(bookingStart / noOfRooms) + 1;
            bookingEnd = startTime + parseInt(bookingEnd / noOfRooms) + 1;
            let startBookingTime = today[3] + "-" + this.getMonth(today[1]) + "-" + today[2] + " " + this.format(bookingStart) + ":00:00.000000";
            let endBookingTime = today[3] + "-" + this.getMonth(today[1]) + "-" + today[2] + " " + this.format(bookingEnd) + ":00:00.000000";
            let postData = {
                startTime: startBookingTime,
                endTime: endBookingTime,
                roomId: roomNo,
                userId: self,
                agenda: this.state.agendaText,
                historyState:0,
                bookingDate: todayDate
    
            }
            
            getUtils.userAuthorizedForBooking(self).then(res=>{
                if(res["status-code"] === 200){
                    postUtils.bookRoom(postData).then(()=>{
                        this.filterOnDate();
                        this.setState({showLoader: false});
                    }).catch(()=>{
                        this.setState({showLoader: false});
                    })
                }
                else{
                    message.error("not eligible, Reason MoM");
                    this.setState({showLoader: false});
                }
            })
        })
    }

    setAgenda=(e)=>{
        this.setState({agendaText: e.target.value});
    }
    bookRoomModal = () => {
        return <Modal
            title="Enter Agenda of Meeting"
            visible={this.state.visibleRoom}
            onOk={this.handleBookRoom}
            onCancel={this.handleCancelBookRoom}
        >
            <Form>
                <Form.Item>
                    <Input
                        placeholder="Agenda of Meeting"
                        onChange={this.setAgenda}
                    />
                </Form.Item>
            </Form>
        </Modal>
    }
    render() {
        return (
            <div className="dashboard">
                <div>
                    {this.state.showLoader && <Icon type="load" style={{fontSize: "40px"}} />} 
                        <div>
                            <p className="dashboard__heading">Conference Room Booking Manager</p>
                            <div className="test" style={{marginLeft: "120px"}}>{this.renderTabs()}</div>
                            {this.bookRoomModal()}
                        </div>
                </div>
            </div>
        )
    }
}

export default Dashboard; 