import React, { Component } from 'react';
import {Motion, spring} from 'react-motion';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            count: 1
        };
    }
  handleMouseDown() {
    this.setState({open: !this.state.open});
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
            </div>
          }
        </Motion>
        </div>
      </div>
    );
  }
}

export default App;
