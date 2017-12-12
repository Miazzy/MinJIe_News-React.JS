import React from 'react';
import {
    Card
} from 'antd';
import {
    Link
} from 'react-router-dom';

export default class PCNewsImageBlock extends React.Component {
    constructor() {
        super();
        this.state = {
            news: ''
        }
    };

    componentWillMount() {
        let myFetchOptions = {
            method: 'GET'
        }
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count, myFetchOptions)
            .then(response => response.json())
            .then(json => this.setState({
                news: json
            }))
    }

    render() {
        const image = {
            width: this.props.imageWidth,
            display: "block",
            height: "90px"
        };
        const title = {
            width: this.props.imageWidth,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
        };
        const {
            news
        } = this.state;
        const newsList = news.length ? news.map((newsItem, index) => (
            <div key={index} class="imageblock">
                    <Link to={`details/${newsItem.uniquekey}`} target="_blank">
                        <div>
                            <img src={newsItem.thumbnail_pic_s} style={image}/>
                        </div>
                        <div class="custom-card">
                            <h3 style={title}>{newsItem.title}</h3>
                            <p>{newsItem.author_name}</p>
                        </div>
                    </Link>
                </div>
        )) : '未请求到数据，刷新浏览器试试~~';
        return (
            <div class="top_list">
                <Card title={this.props.cartTitle} style={{width: this.props.width}}>
                    {newsList}
                </Card>
            </div>
        )
    }
}