import React, { Component } from 'react';
import {Motion, spring} from 'react-motion';
import {Affix, Button, BackTop, Table, Input } from 'antd';

import 'antd/lib/affix/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/table/style/css';
import 'antd/lib/back-top/style/css';

import logo from './logo.svg';
import './App.css';

import { bfs } from './finder.js';
import { Complete } from './searchBar.js'
import store, { STORAGE_ID } from './storage.js'
import BoxList from './Box.js'


const exec = window.child_process.exec;
const spawn = window.child_process.spawn;
const dialog = window.electron.remote.dialog

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name', },
  { title: 'Path', dataIndex: 'path', key: 'path', }
];

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
      this.handleMouseDown();
      console.log(e.target) 
    }
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

    childP.stdout.on('data', (data) => {
      console.log(`stdout[${record.name}]: ${data}`);
    });

    childP.stderr.on('data', (data) => {
      console.log(`stderr[${record.name}]: ${data}`);
    });

    childP.on('close', (code) => {
      console.log(`child process [${record.name}] exited with code ${code}`);
    });

  }

  render() {
    return (
      <div className="App App-background flex-container column">
        <div className="App-header " style={{color: '#6E6E6E'}}>
        
          <img src={logo} alt="logo" style={{ height: 67 +'px', margin: 10+'px'}}/>

          <div className="flex-item">

            <Button style={{ fontSize: 14 + 'px' }}
              className="App-button right"
              type="primary"
              icon={this.state.inputButtonIcon}
              size="default" onClick={(e) => this.handleFolderSelector(e)} > Load Reps
            </Button>
          </div>

          <Affix offsetTop={5}>
            <Complete dataSource={this.state.repos} className="flex-item" style={{ width: 85 + '%', paddingTop: 13 + 'px', zIndex: 100 }} />
          </Affix>
        </div> 
        <div className="flex-item center column" style={{ width: 100 + '%'}}>

          <div style={{ background: "#CCC", paddingTop: 30+'px'}}>
              <BoxList dataSource={this.state.repos}></BoxList>
          </div>  
        </div>
        <BackTop className="App-backTop" visibilityHeight={100} />
      </div>
    );
  }
}

export default App;
{/*<h2>Welcome to LocalReps</h2>*/ }
            {/*<img src={logo} className="App-logo" alt="logo" />*/}
          {/*<Button className="App-logo" type="primary" shape="circle" icon={this.state.inputButtonIcon}  size="large" />*/}
          
        {/*<Input className="App-input" onClick={(e)=> this.handleFolderSelector(e)} placeholder="File"  addonAfter={<Icon type={this.state.inputButtonIcon}  />}type="text" id="uploadFile" />*/}
          {/*<span className='flex-item'
            style={{'color': '#6E6E6E',  fontSize: 10+'px' }}>
            Repos relative to: {this.state.searchPath}
          </span>*/}
        {/*<Table dataSource={this.state.repos}
          columns={columns}
          size={"medium"}
          showHeader={true}
          pagination={{ pageSize: 100 }}
          className="App-table"
          locale={{ emptyText: '' }}
          onRowClick={(r,i) => this.handleRowClick(r,i)}
        />*/}