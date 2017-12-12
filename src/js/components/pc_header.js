import React from 'react';
import {
    Link
} from 'react-router-dom';
import {
    Row,
    Col
} from 'antd';
import {
    Menu,
    Icon,
    Tabs,
    message,
    Form,
    Input,
    Button,
    Modal,
    Checkbox
} from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class PCHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 'top',
            hasLogined: false,
            userNickName: '',
            userid: 0,
            modalVisible: false,
            action: 'login'
        }
    };

    componentWillMount() {
        if (localStorage.userid !== '') {
            this.setState({
                hasLogined: true
            });
            this.setState({
                userNickName: localStorage.userNickName,
                userid: localStorage.userid
            });
        }
    };

    setModalVisible(value) {
        this.setState({
            modalVisible: value
        });
    };

    handleClick(e) {
        if (e.key == 'register') {
            this.setState({
                current: 'register'
            });
            this.setModalVisible(true);
        } else {
            this.setState({
                current: e.key
            });
        }
    };

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
                    useid: json.UserId
                });
                localStorage.userid = json.UserId;
                localStorage.userNickName = json.NickUserName;
                document.title = "首页 - MǐnJIé News | MǐnJIé 新闻头条"
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

    logout() {
        localStorage.userid = '';
        localStorage.userNickName = '';
        this.setState({
            hasLogined: false
        });
    }

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
        const userShow = this.state.hasLogined ? <Menu.Item key="login" class="register">
            <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
            &nbsp;&nbsp;
            <Link target="_blank" to={`/usercenter`}>
                <Button type="dashed" htmlType="button">个人中心</Button>
            </Link>
            &nbsp;&nbsp;
            <Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>退出</Button>
        </Menu.Item> : <Menu.Item key="register" class="register">
            <Icon type="user-add"/>注册 / 登录
        </Menu.Item>;
        return (
            <header>
                <Row>
                    <Col span={2}/>
                    <Col span={4}>
                        <a href="/" class="logo">
                            <img src="/src/images/logo.png" alt="logo"/>
                            <span>MǐnJIé</span>
                        </a>
                    </Col>
                    <Col span={16}>
                        <Menu mode="horizontal" selectedKeys={[this.state.current]}
                              onClick={this.handleClick.bind(this)}>
                            <SubMenu title={<span><Icon type="link"/>Hello</span>}>
                                <MenuItemGroup title="Welcome">
                                    <Menu.Item key="1">MǐnJIé</Menu.Item>
                                    <Menu.Item key="2">JIéMart</Menu.Item>
                                </MenuItemGroup>
                            </SubMenu>
                            <Menu.Item key="keji">
                                <Icon type="desktop"/>我们以为计划好了一切，可命运只有在这种时候开玩笑，才会让人真正意识到它的存在。
                            </Menu.Item>
                            {userShow}
                        </Menu>
                        <Modal
                            title="用户中心"
                            wrapclass="vertical-center-modal"
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
                                                <Checkbox>记住我</Checkbox>
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
                    </Col>
                    <Col span={2}/>
                </Row>
            </header>
        );
    }
}

export default PCHeader = Form.create({})(PCHeader);