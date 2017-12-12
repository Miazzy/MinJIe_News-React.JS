import React from 'react'
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import {
    Row,
    Col,
    Tabs,
    Upload,
    Icon,
    Card,
    Modal
} from 'antd';

const TabPane = Tabs.TabPane;


export default class MobileUserCenter extends React.Component {
    constructor() {
        super();
        this.state = {
            previewVisible: false,
            previewImage: '',
            usercollection: '',
            usercomments: ''
        }
    }

    componentDidMount() {
        let myFetchOptions = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userid, myFetchOptions).then(response => response.json()).then(json => {
            this.setState({
                usercollection: json
            });
            document.title = "个人中心 - MǐnJIé News | MǐnJIé 新闻头条"
        });

        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userid, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({usercomments: json});
            });
    }

    handleCancel() {
        this.setState({previewVisible: false});
    }

    render() {
        const props = {
            action: "//jsonplaceholder.typicode.com/posts/",
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            listType: 'picture-card',
            defaultFileList: [
                {
                    uid: -1,
                    name: 'xxx.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                }
            ],
            onPreview: (file) => {
                this.setState({previewImage: file.url, previewVisible: true});
            }
        };
        const {usercollection} = this.state;
        const usercollectionList = usercollection.length
            ? usercollection.map((collections, index) => (
                <Card key={index} extra={<a target="_blank" href={`/#/details/${collections.uniquekey}`}>查看</a>}>
                    <p>{collections.Title}</p>
                </Card>
            ))
            : '您还没有任何收藏';

        const {usercomments} = this.state;
        const usercommentsList = usercomments.length
            ? usercomments.map((comment, index) => (
                <Card key={index} title={`${comment.datetime} 评论了文章`}
                      extra={<a target="_blank" href={`/#/details/${comment.uniquekey}`}>查看</a>}>
                    <p>{comment.Comments}</p>
                </Card>
            ))
            : '您还未发表任何评论';

        return (
            <div>
                <MobileHeader/>
                <Row>
                    <Col span={24}>
                        <Tabs>
                            <TabPane tab="我的收藏" key="1">
                                <div>
                                    <Row>
                                        <Col span={24}>
                                            {usercollectionList}
                                        </Col>
                                    </Row>
                                </div>
                            </TabPane>
                            <TabPane tab="我的评论" key="2">
                                <div>
                                    <Row>
                                        <Col span={24}>
                                            {usercommentsList}
                                        </Col>
                                    </Row>
                                </div>
                            </TabPane>
                            <TabPane tab="个人信息" key="3">
                                <div class="clearfix">
                                    <Upload {...props}>
                                        <Icon type="plus"/>
                                        <div className="ant-upload-text">上传照片</div>
                                    </Upload>
                                    <Modal visible={this.state.previewVisible} footer={null}
                                           onCancel={() => this.handleCancel()}>
                                        <img alt="预览" src={this.state.previewImage} class="preview_img"/>
                                    </Modal>
                                </div>
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
                <MobileFooter/>
            </div>
        )
    }
}