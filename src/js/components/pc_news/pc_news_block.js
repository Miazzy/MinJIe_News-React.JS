import React from 'react';
import {
    Card
} from 'antd';
import {
    Link
} from 'react-router-dom';

export default class PCNewsBlock extends React.Component {
    constructor() {
        super();
        this.state = {
            news: ''
        };
    };

    componentWillMount() {
        let myFetchOptions = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count, myFetchOptions)
            .then(response => response.json())
            .then(json => this.setState({
                news: json
            }));
    };

    render() {
        const {
            news
        } = this.state;
        const newsList = news.length ? news.map((newsItem, index) => (
            <li key={index}>
                    <Link to={`details/${newsItem.uniquekey}`} target="_blank">
                        {newsItem.title}
                    </Link>
                </li>
        )) : '未请求到数据，刷新浏览器试试~~';
        return (
            <div class="top_list">
                <Card>
                    <ul>{newsList}</ul>
                </Card>
            </div>
        )
    }
}