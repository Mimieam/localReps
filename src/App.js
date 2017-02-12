import React, { Component } from 'react';
import {Motion, spring} from 'react-motion';
import { Button, BackTop, Table } from 'antd';
// import 'antd/dist/antd.css';
import 'antd/lib/button/style/css';
import 'antd/lib/table/style/css';
import 'antd/lib/back-top/style/css';

import logo from './logo.svg';
import './App.css';

import {bfs} from './finder.js';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Path',
  dataIndex: 'path',
  key: 'path',
}];


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            count: 1,
            repos:[]
        };
    }
  
  componentDidMount() {
    // console.log("--------fs", window.fs)
  }
  handleMouseDown() {
    this.setState({
      open: !this.state.open,
      repos:  bfs('/Users/Miezan/Desktop/')
    });
  }
  handleTouchStart(e) {
    e.preventDefault();
    this.handleMouseDown();
  }

  render() {
    return (
      <div className="App App-background">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to LocalReps</h2>
          <Button className="App-logo" type="primary" shape="circle" icon="setting" size="large" />
        </div>
        <div className="App-intro">
        <Motion style={{x: spring(this.state.open ? 200 : 0)}}>
          {({x}) =>
            // children is a callback which should accept the current value of
            // `style`
            <div className="demo0"
                 onMouseDown={(e) => this.handleMouseDown(e)}
                 onTouchStart={this.handleTouchStart.bind(this)}>
              <div className="demo0-block" style={{
                WebkitTransform: `translate3d(${x}px, 0, 0)`,
                transform: `translate3d(${x}px, 0, 0)`,
              }} />
            </div>
          }
        </Motion>
        </div>

        <Table dataSource={this.state.repos}
          columns={columns}
          size={"medium"}
          showHeader={true}
          pagination={{ pageSize: 100 }}
        />  
        <Button type="primary">Button</Button>
        <BackTop className="App-backTop" visibilityHeight={100} />
      </div>
    );
  }
}

export default App;
