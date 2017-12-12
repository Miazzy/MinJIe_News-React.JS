import React from 'react';
import ReactDom from 'react-dom';
import {
    Route,
    BrowserRouter,
    Switch
} from 'react-router-dom';
import 'antd/dist/antd.css';
import MediaQuery from 'react-responsive';
import PCIndex from './components/pc_index';
import PCNewsDetails from './components/pc_news/pc_news_detail';
import MobileNewsDetails from './components/mobile_news_detail';
import MobileIndex from './components/mobile_index';
import PCUserCenter from './components/pc_usercenter';
import MobileUserCenter from './components/mobile_usercenter';

export default class Root extends React.Component {
    render() {
        return (
            <div>
                <MediaQuery query='(min-device-width:1224px)'>
                    <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={PCIndex}/>
                        <Route path="/details/:uniquekey" component={PCNewsDetails}/>
                        <Route path="/usercenter" component={PCUserCenter}/>
                        </Switch>
                    </BrowserRouter>
                </MediaQuery>
                <MediaQuery query='(max-device-width:1224px)'>
                    <BrowserRouter>
                    <Switch>
                        <Route path="/" component={MobileIndex}/>
                        <Route path="/details/:uniquekey" component={MobileNewsDetails}/>
                        <Route path="/usercenter" component={MobileUserCenter}/>
                        </Switch>
                    </BrowserRouter>
                </MediaQuery>
            </div>
        )
    }
}

ReactDom.render(<Root/>, document.getElementById('mainContainer'));