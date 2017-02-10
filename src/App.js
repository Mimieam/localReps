import React, { Component } from 'react';
import {Motion, spring} from 'react-motion';
import { Button, BackTop } from 'antd';
// import 'antd/dist/antd.css';
import 'antd/lib/button/style/css';

import logo from './logo.svg';
import './App.css';

import {bfs} from './finder.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            count: 1,
            repos:[]
        };
    }
  handleMouseDown() {
    this.setState({
      open: !this.state.open,
      repos: bfs('/Users/Miezan/')
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
            <Button type="primary">Button</Button>
            <Button type="primary" shape="circle" icon="setting" size="large" />
            </div>
          }
        </Motion>
        </div>

<BackTop />
    Scroll down to see the bottom-right
    <strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}> gray </strong>
    button.
      {this.state.repos}
      </div>
    );
  }
}

export default App;
