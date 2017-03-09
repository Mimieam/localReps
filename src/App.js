import React, { Component } from 'react';
import {Motion, spring} from 'react-motion';
import { Button, BackTop, Table, Input } from 'antd';

// import 'antd/dist/antd.css';
import 'antd/lib/button/style/css';
import 'antd/lib/table/style/css';
import 'antd/lib/back-top/style/css';

import logo from './logo.svg';
import './App.css';

import { bfs } from './finder.js';
import { Complete } from './searchBar.js'
import store, { STORAGE_ID } from './storage.js'


const dialog = window.electron.remote.dialog

const exec = window.child_process.exec;
const spawn = window.child_process.spawn;

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Path',
  dataIndex: 'path',
  key: 'path',
}];

// TODO: finish this function for other platforms
const getUserDirectory = () => {
  const platform = window.process.platform
  const userInfo = window.os.userInfo()
  let path = ''
  if (platform === 'darwin') {
    path =  `${userInfo.homedir}`
  } else if (platform === 'win32'){
    path =  ``
  }
  else {
    path =  ``
  }
  console.log(path, platform)
  return path
}




class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            count: 1,
            searchPath: getUserDirectory() + '/Desktop/',
            repos: store.get(STORAGE_ID).repos,
            inputButtonIcon: "setting"
        };
      
    }

  componentDidMount() {
    console.log(getUserDirectory())
  }
  handleFolderSelector(e) {
    const selected = dialog.showOpenDialog({ properties: ['openDirectory', 'multiSelections'] })
    if (selected !== undefined && selected.length > 0) {
      this.setState({ searchPath: selected[0] })
    }
    console.log(e.target)
  }
  handleMouseDown() {
    this.setState({
      open: !this.state.open,
      inputButtonIcon: this.state.inputButtonIcon === "setting"? "loading": "setting" ,
      repos:  bfs(this.state.searchPath)
    });
  }
  handleTouchStart(e) {
    e.preventDefault();
    this.handleMouseDown();
  }

  handleRowClick(record,index) {

    let cmd = "cd " + record.path + " && npm start"
    let parts = cmd.split(/\s+/g);
    const childP = spawn(parts[0], parts.slice(1), {
                        cwd:record.path,
                        shell:true })

    // const ls = spawn('ls', ['-lh', '/usr'], {cwd:record.path, shell:true});
    childP.stdout.on('data', (data) => {
      console.log(`stdout[${record.name}]: ${data}`);
    });

    childP.stderr.on('data', (data) => {
      console.log(`stderr[${record.name}]: ${data}`);
    });

    childP.on('close', (code) => {
      console.log(`child process [${record.name}] exited with code ${code}`);
    });


      // (error, stdout, stderr) => {
      // exec(cmd.split(" "), (error, stdout, stderr) => {
      //   if (error) {
      //     console.error(`exec error: ${error}`);
      //     return;
      //   }
      //   console.log(`stdout: ${stdout}`);
      //   console.log(`stderr: ${stderr}`);
      // });

  }

  render() {
    return (
      <div className="App App-background">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to LocalReps</h2>
          <Button className="App-logo" type="primary" shape="circle" icon={this.state.inputButtonIcon}  size="large" />
        </div>
        {/*<Input className="App-input" onClick={(e)=> this.handleFolderSelector(e)} placeholder="File"  addonAfter={<Icon type={this.state.inputButtonIcon}  />}type="text" id="uploadFile" />*/}
        <Complete/>
        <Button className="App-button" type="primary" icon={this.state.inputButtonIcon} size="default" onClick={(e) => this.handleFolderSelector(e)} />
        <Input className="App-input" placeholder="Select a folder" type="text" id="uploadFile" value={this.state.searchPath} />
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
          /*showHeader={true}*/
          pagination={{ pageSize: 100 }}
          className="App-table"
          locale={{ emptyText: '' }}
          onRowClick={(r,i) => this.handleRowClick(r,i)}
        />
        <BackTop className="App-backTop" visibilityHeight={100} />
      </div>
    );
  }
}

export default App;
