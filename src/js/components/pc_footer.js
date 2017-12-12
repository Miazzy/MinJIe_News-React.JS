import React from 'react';
import {Row, Col} from 'antd';

export default class PCFooter extends React.Component {
    render() {
        return (
            <footer>
                <Row>
                    <Col span={2}/>
                    <Col span={20}>
                        <footer>
                            <div class="content">
                                <nav class="primary">
                                    <section class="about">
                                        <ul class="links">
                                            <li><a href="">关于</a></li>
                                            <li>QQ： 1434246346</li>
                                            <li><a href="">意见反馈</a></li>
                                        </ul>
                                    </section>
                                </nav>
                                <nav class="secondary">
                                    <div class="small-links">
                                        <ul>
                                            <li><a href="#">隐私</a></li>
                                            <li><a href="#">Cookie</a></li>
                                            <li><a href="#">法律</a></li>
                                        </ul>
                                        <p class="license">
                                            Copyright © 2011–2017 杰 All Right Reserved
                                        </p>
                                        <br/><br/>
                                        <p>
                                            <a href="http://www.miitbeian.gov.cn/" target="_blank">晋ICP备17011243号-1</a>
                                        </p>
                                    </div>
                                </nav>
                            </div>
                        </footer>
                    </Col>
                    <Col span={2}/>
                </Row>
            </footer>
        )
    }
}