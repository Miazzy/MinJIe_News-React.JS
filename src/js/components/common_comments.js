import React from 'react'
import {
    Row,
    Col,
    Card,
    Form,
    Button,
    Input,
    notification
} from 'antd'
import {
    message
} from "antd/lib/index";

const FormItem = Form.Item;

class CommonComments extends React.Component {
    constructor() {
        super();
        this.state = {
            comments: '',
            userid: ''
        }
    }

    componentDidMount() {
        let myFetchOptions = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" + this.props.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
            this.setState({
                comments: json
            });
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let myFetchOptions = {
            method: 'GET'
        };
        let formdata = this.props.form.getFieldsValue();
        if (localStorage.userid === '') {
            notification['error']({
                message: '友情提示：',
                description: '请先登录！'
            });
        } else {
            fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey + "&commnet=" + formdata.remark, myFetchOptions).then(response => response.json()).then(json => {
                notification['success']({
                    message: '友情提示：',
                    description: '评论成功！'
                });
                this.componentDidMount();
            })
        }
    }

    render() {
        let {
            getFieldDecorator
        } = this.props.form;
        const {
            comments
        } = this.state;
        const commenstList = comments.length ? comments.map((comment, index) => ( < Card key = {
                index
            }
            title = {
                <div class="author"><img src="/src/images/smile.svg"
                                                      class="img"/><span>{comment.UserName}</span></div>
            }
            extra = {
                <span> 发布于 {comment.datetime}</span>
            } >
            <p>{comment.Comments}</p> < /Card>
        )) : "等待您的评论~~~";
        return (
            <div>
                <Row>
                    <Col span={24}>
                        <Form class="saywhat" onSubmit={this.handleSubmit.bind(this)}>
                            <FormItem label="我要评论">
                                {getFieldDecorator('remark', {initialValue: ''})(
                                    <Input type="textarea" placeholder="扯淡、吐槽、表扬、鼓励……想说啥就说啥！"/>
                                )}
                            </FormItem>
                            <Button type="primary" htmlType="submit">提交评论</Button>
                            <div class="list">评论列表</div>
                            {commenstList}
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default CommonComments = Form.create({})(CommonComments);