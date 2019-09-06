import React from 'react';
import axios from 'axios'
import { Button } from 'antd';

class Loader extends React.Component {

    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }

    componentWillMount() {
        this.callAPI();
    }

    callAPI = () => {
        let userData = {
            email: "vikram@gmail.com",
            password: "vikram",
        }
        axios.post("/api/users/login", userData)
            .then(res => console.log("success", res))
            .catch(err => console.log("error", err))
    }

    handleClick = () => {
        console.log("clicked");
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleClick}>click</Button>
                <h1>{this.state.apiResponse}Vikram</h1>
            </div>
        )
    }
}

export default Loader;