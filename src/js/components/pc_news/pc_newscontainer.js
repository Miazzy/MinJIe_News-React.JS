import React from 'react';
import {Row, Col, Tabs, Carousel} from 'antd';
import PCNewsBlock from './pc_news_block';
import PCNewsImageBlock from './pc_news_image_block';
import PCProduct from './pc_product';

const TabPane = Tabs.TabPane;

export default class PCContainer extends React.Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            autoplay: true
        };
        return (
            <div>
                <Row>
                    <Col span={2}/>
                    <Col span={20} class="container">
                        <div class="l_container">
                            <div class="carousel">
                                <Carousel {...settings}>
                                    <div><a href="http://minjie.shop/"><img src="./src/images/bg1.jpg"/></a></div>
                                    <div><a href="http://minjie.shop/"><img src="./src/images/bg2.jpg"/></a></div>
                                    <div><a href="http://minjie.shop/"><img src="./src/images/bg3.jpg"/></a></div>
                                    <div><a href="http://minjie.shop/"><img src="./src/images/bg4.jpg"/></a></div>
                                    <div><a href="http://minjie.shop/"><img src="./src/images/bg5.jpg"/></a></div>
                                </Carousel>
                            </div>
                            <PCNewsImageBlock cartTitle="国际头条" count={6} type="guoji" width="400px" imageWidth="112px"/>
                        </div>

                        <Tabs class="tabs_news" defaultActiveKey="2" size="small">
                            <TabPane tab="热点" key="1">
                                <PCNewsBlock count={20} type="top" width="100%" bordered="false"/>
                            </TabPane>
                            <TabPane tab="科技" key="2">
                                <PCNewsBlock count={20} type="keji" width="100%" bordered="false"/>
                            </TabPane>
                            <TabPane tab="娱乐" key="3">
                                <PCNewsBlock count={20} type="yule" width="100%" bordered="false"/>
                            </TabPane>
                            <TabPane tab="社会" key="4">
                                <PCNewsBlock count={20} type="guonei" width="100%" bordered="false"/>
                            </TabPane>
                        </Tabs>

                        <Tabs class="tabs_product">
                            <TabPane tab="网易 产品" key="1">
                                <PCProduct/>
                            </TabPane>
                        </Tabs>

                        <div class="news_container">
                            <PCNewsImageBlock cartTitle="国内新闻" count={14} type="guonei" width="100%"
                                              imageWidth="142px"/>
                            <PCNewsImageBlock cartTitle="娱乐热点" count={14} type="yule" width="100%" imageWidth="142px"/>
                            <PCNewsImageBlock cartTitle="科技资讯" count={14} type="keji" width="100%" imageWidth="142px"/>
                        </div>
                    </Col>
                    <Col span={2}/>
                </Row>
            </div>
        )
    }
}