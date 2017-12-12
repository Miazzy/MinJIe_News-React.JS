import React from 'react';
import {Row, Col} from 'antd';

export default class MobileFooter extends React.Component {
    render() {
        return (
            <footer>
                <Row>
                    <Col span={2}/>
                    <Col span={20}>
                        <footer>
                            <p>
                                Copyright © 2011–2017 杰 All Right Reserved
                            </p>
                        </footer>
                    </Col>
                    <Col span={2}/>
                </Row>
            </footer>
        )
    }
}