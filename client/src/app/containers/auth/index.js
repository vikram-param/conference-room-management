import React from 'react';
import axios from 'axios'
import { Form, Card, Input } from 'antd';

class Authentication extends React.Component {

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
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Card>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item
                            label="Email ID">
                            {getFieldDecorator('emailId', {
                                rules: [{ required: true, message: 'Please input the Email ID' }],
                            })(
                                <Input type="text"
                                    id="email"
                                    name="Email ID"
                                />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="Password">
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input the password' }],
                            })(
                                <Input type="password"
                                    id="password"
                                    name="Password"
                                />
                            )}
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Form.create({ name: 'normal_login' })(Authentication);