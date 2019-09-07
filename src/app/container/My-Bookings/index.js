import React, { Component } from 'react';
import { Table, Card, Modal, Input, Button, message } from 'antd';
import * as getUtils from '../../utils/get';
import * as postUtils from '../../utils/post';

const { TextArea } = Input;

const columns = [
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Room',
        dataIndex: 'roomName',
        key: 'roomName',
    },
    {
        title: 'Agenda',
        dataIndex: 'agenda',
        key: 'agenda',
    },
    {
        title: 'Start Time',
        dataIndex: 'startTime',
        key: 'startTime',
    },
    {
        title: 'End Time',
        dataIndex: 'endTime',
        key: 'endTime',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    }
];

class MyBookings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            showModal: false
        }
    }

    async componentDidMount() {

        let self = localStorage.getItem('userId'), dataSource = [], newData, status;
        let allBookings = await getUtils.getBookingsByUser(self);
        let currTime = new Date();
        allBookings = allBookings.content;
        for (let i = 0; i < allBookings.length; i++) {
            status = "Booked"
            if (currTime.toISOString() <= allBookings[i].startTime) {
                status = "Completed"
            }

            newData = {
                key: i + 1,
                date: allBookings[i].bookingDate.split('T')[0],
                roomName: allBookings[i].roomId_id,
                startTime: allBookings[i].startTime.split('T')[1].split('.')[0],
                endTime: allBookings[i].endTime.split('T')[1].split('.')[0],
                status: status,
                agenda: allBookings[i].agenda,
                bookingId: allBookings[i].bookingId
            }
            dataSource.push(newData);
        }
        console.log(self, allBookings)
        this.setState({ dataSource: dataSource });
    }

    handleActionClick = (data) => {
        this.setState({ showModal: true, agendaText: data.agenda });
    }

    handleCancelModal = () => {
        this.setState({ showModal: false });
    }

    setMoM = (e) => {
        this.setState({ mom: e.target.value });
    }

    submitMoM = () => {
        let self = localStorage.getItem('userId');
        let postData = {
            bookingId: this.state.nextPageData.bookingId,
            userId: self,
            roomId: this.state.nextPageData.roomName,
            aboutMoM: this.state.mom,
            remarks: "",
            projectTitle: ""
        }
        console.log(postData)
        postUtils.submitMom(postData).then(()=>{
            message.success("MoM added successfully")
            this.setState({showRowDetails: false});
        }).catch(err=>{
            message.error("error in adding MoM");
        });
    }

    renderModal = () => {
        return <Modal
            title="Submit MoM"
            visible={this.state.showModal}
            onOk={this.submitMoM}
            onCancel={this.handleCancelModal}
        >
            <p>Agenda: {this.state.agendaText}</p>
            <TextArea
                onChange={this.setMoM}
                placeholder="MoM"
                autosize={{ minRows: 3, maxRows: 5 }}
            />
        </Modal>
    }

    handleRowClick = async(record, index) => {
        let mom = await getUtils.getMoM(record.bookingId);
        this.setState({ showRowDetails: true, nextPageData: record, haveMom: mom.content.length !== 0 });
        if(mom.content.length !== 0){
            this.setState({mom: mom.content[0].aboutMoM});
        }
    }

    goBack = () => {
        this.setState({ showRowDetails: false });
    }

    render() {
        return (
            <div style={{ marginTop: "100px" }}>
                {
                    this.state.showRowDetails ?
                        <div>
                            <Card style={{ width: "500px", margin: "0 auto" }}>
                                <p><b>Meeting start Time:</b> {this.state.nextPageData.startTime}</p>
                                <p><b>Meeting end Time:</b> {this.state.nextPageData.endTime}</p>
                                <p><b>Room:</b> {this.state.nextPageData.roomName}</p>
                                <p><b>Status:</b> {this.state.nextPageData.status}</p>
                                {!this.state.haveMom ?
                                    <TextArea
                                        onChange={this.setMoM}
                                        placeholder="Enter the MoM"
                                        autosize={{ minRows: 10, maxRows: 15 }}
                                        style={{ marginBottom: "20px" }}
                                    /> :
                                    <p><b>MoM:</b> {this.state.mom}</p>
                                }
                                <Button onClick={this.goBack} style={{marginRight: "20px"}}>Go Back</Button>
                                <Button onClick={this.submitMoM}>Submit</Button>
                            </Card>
                        </div>
                        :
                        <Table
                            columns={columns}
                            dataSource={this.state.dataSource}
                            style={{ width: "70%", margin: "0 auto" }}
                            onRowClick={(record, index) => { this.handleRowClick(record, index) }}
                        />
                }
            </div>
        )
    }
}

export default MyBookings