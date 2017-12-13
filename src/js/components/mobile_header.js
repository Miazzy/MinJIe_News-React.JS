import React from 'react';
import {
    Link
} from 'react-router-dom';
import {
    Icon,
    Tabs,
    message,
    Form,
    Input,
    Button,
    Modal,
    Checkbox
} from 'antd';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class MobileHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            hasLogined: false,
            action: 'login',
            userNickName: '',
            userid: 0,
            modalVisible: false,
            modalUser: false
        }
    }

    componentWillMount() {
        if (localStorage.userid != '') {
            this.setState({
                hasLogined: true
            });
            this.setState({
                userNickName: localStorage.userNickName,
                userid: localStorage.userid
            });
        }
    }

    login() {
        this.setModalVisible(true);
    }

    setModalVisible(value) {
        this.setState({
            modalVisible: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        var myFetchOptions = {
            method: 'GET'
        };
        var formData = this.props.form.getFieldsValue();
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action + "&username=" + formData.userName + "&password=" + formData.password + "&r_userName=" + formData.r_userName + "&r_password=" + formData.r_password + "&r_confirmPassword=" + formData.r_confirmPassword, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    userNickName: json.NickUserName,
                    userid: json.UserId
                });
                localStorage.userid = json.UserId;
                localStorage.userNickName = json.NickUserName;
            });
        if (this.state.action == "login") {
            this.setState({
                hasLogined: true
            });
            message.success("登录成功！");
        } else {
            message.success("注册成功！");
        }
        this.setModalVisible(false);
    }

    callback(key) {
        if (key == 1) {
            this.setState({
                action: 'login'
            });
        } else if (key == 2) {
            this.setState({
                action: 'register'
            });
        }
    }

    logoutUser() {
        this.setModalUser(true);
    }

    setModalUser(value) {
        this.setState({
            modalUser: value
        });
    }


    logout() {
        localStorage.userid = '';
        localStorage.userNickName = '';
        this.setState({
            hasLogined: false
        });
        this.setModalUser(false);
    };

    render() {
        let {
            getFieldDecorator
        } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 6
                },
            },
            wrapperCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 14
                },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };
        const userShow = this.state.hasLogined ?
            <Icon type="smile-o" onClick={this.logoutUser.bind(this)}/> : <Icon type="user-add" onClick={this.login.bind(this)}/>;
        const userCenter = <div style={{textAlign: "center"}}><Link to={`/usercenter`}>去个人中心</Link></div>;
        return (
            <div id="mobileheader">
                <header>
                    <img src="/src/images/logo.png" alt="logo"/>
                    <span>MǐnJIé</span>
                    {userShow}
                </header>

                <Modal
                    title="用户中心"
                    wrapClassName="vertical-center-modal"
                    onOk={() => this.setModalVisible(false)}
                    onCancel={() => this.setModalVisible(false)}
                    okText="关闭"
                    visible={this.state.modalVisible}
                >
                    <Tabs type="card" onChange={this.callback.bind(this)}>
                        <TabPane tab="登录" key="1">
                            <Form onSubmit={this.handleSubmit.bind(this)}>
                                <FormItem>
                                    {getFieldDecorator('userName', {
                                        rules: [{required: true, message: 'Please input your username!'}],
                                    })(
                                        <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                               placeholder="请输入您的账号"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        rules: [{required: true, message: 'Please input your Password!'}],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                               type="password" placeholder="请输入您的密码"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('remember', {
                                        valuePropName: 'checked',
                                        initialValue: true,
                                    })(
                                        <Checkbox>7天内自动登录</Checkbox>
                                    )}
                                    <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                                        登录
                                    </Button>
                                </FormItem>
                            </Form>
                        </TabPane>
                        <TabPane tab="注册" key="2">
                            <Form onSubmit={this.handleSubmit.bind(this)}>
                                <FormItem {...formItemLayout} label="账号">
                                    {getFieldDecorator('r_userName', {
                                        rules: [{
                                            required: true,
                                            message: 'Please input your nickname!',
                                            whitespace: true
                                        }],
                                    })(
                                        <Input placeholder="请输入您的账号"/>
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label="密码">
                                    {getFieldDecorator('r_password', {
                                        rules: [{
                                            required: true, message: 'Please input your password!',
                                        }],
                                    })(
                                        <Input type="password"
                                               placeholder="请输入您的密码"/>
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label="确认密码">
                                    {getFieldDecorator('r_confirmPassword', {
                                        rules: [{
                                            required: true, message: 'Please confirm your password!',
                                        }],
                                    })(
                                        <Input type="password"
                                               placeholder="请再次输入您的密码"/>
                                    )}
                                </FormItem>
                                <FormItem {...tailFormItemLayout}>
                                    <Button type="primary" htmlType="submit">注册</Button>
                                </FormItem>
                            </Form>
                        </TabPane>
                    </Tabs>
                </Modal>

                <Modal
                    title={this.state.userNickName}
                    wrapClassName="vertical-center-modal"
                    onOk={() => this.setModalUser(false)}
                    onCancel={() => this.logout(false)}
                    cancelText="退出当前用户"
                    okText="返回"
                    visible={this.state.modalUser}
                >
                    <div style={{textAlign: "center"}}>
                        <Button type="primary" shape="circle" loading/>
                    </div>
                    {userCenter}
                </Modal>
            </div>
        )
    }
}

export default MobileHeader = Form.create({})(MobileHeader);