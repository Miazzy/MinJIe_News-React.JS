import React from 'react';
import {
    Row,
    Col,
    BackTop,
    Button,
    notification
} from 'antd';
import PCHeader from '../pc_header';
import PCFooter from '../pc_footer';
import PCNewsImageBlock from './pc_news_image_block';
import CommonComments from '../common_comments';

export default class PCNewsDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            newsItem: '',
            userid: 0,
            hasLogined: false
        }
    }

    componentDidMount() {
        var myFetchOptions = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.match.params.uniquekey, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    newsItem: json
                });
                document.title = this.state.newsItem.title + "- MǐnJIé News | MǐnJIé 新闻头条"
            })
    }

    createMarkup() {
        return {
            __html: this.state.newsItem.pagecontent
        };
    }

    addCollection() {
        var myFetchOptions = {
            method: 'GET'
        };
        if (localStorage.userid === '') {
            notification['error']({
                message: '友情提示：',
                description: '请先登录！'
            });
        } else {
            this.setState({
                hasLogined: true
            });
            this.setState({
                userid: localStorage.userid
            });
            fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=" + this.state.userid + "&uniquekey=" + this.props.match.params.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
                notification['success']({
                    message: 'ReactNews提醒',
                    description: '收藏此文章成功'
                });
            });
        }
    };

    render() {
        return (
            <div>
                <PCHeader/>
                <Row>
                    <Col span={2}/>
                    <Col span={14} className="container">
                        <div dangerouslySetInnerHTML={this.createMarkup()}></div>
                        <div class="collect">
                            <Button type="primary" htmlType="button"
                                    onClick={this.addCollection.bind(this)} class="collect_btn">收藏该文章</Button>
                        </div>
                        <hr/>
                        <CommonComments uniquekey={this.props.match.params.uniquekey}/>
                    </Col>
                    <Col span={6} className="detail_img">
                        <PCNewsImageBlock count={18} type="shehui" width="100%" imageWidth="152px"/>
                    </Col>
                    <Col span={2}/>
                </Row>
                <PCFooter/>
                <BackTop/>
            </div>
        )
    }
}