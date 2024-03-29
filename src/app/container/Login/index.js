import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Alert } from 'antd';
import './index.scss';
import { withRouter } from 'react-router';
import * as postUtils from '../../utils/post';

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInvalidUser: false
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        postUtils.logIn(values.username, values.password).then(data => {
          console.log(data);
          if (data["status-code"] === 200) {
            localStorage.setItem("userId", data.content.userId);
            localStorage.setItem("role", data.content.role);
            if(data.content.role === 0) {
              this.props.history.push('/admin');
              return;
            }
            this.props.history.push("/dashboard");
          }
          if (data["status-code"] == 401) {
            this.setState({
              showInvalidUser: true
            })
          }
        }).catch(err => {
          console.log(err);
          this.setState({
            showInvalidUser: true
          })
        })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-form">
        {this.state.showInvalidUser ? <Alert message="Invalid user name or password" type="error" /> : null}
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="" style={{ float: "right" }}>
              Forgot password
          </a>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: "100" }}>
              Log in
          </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default withRouter(WrappedNormalLoginForm); 