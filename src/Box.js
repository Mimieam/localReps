import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import { Button } from 'antd';

console.log(PubSub)

let filteredSource = []
var mySubscriber = function( msg, data ){
  console.log("PubSub: ", msg, data);
  filteredSource = data  
  return data
  
};

const ACTIONS = {
  "edit":'',
  "execute": '',
  "open terminal": '',
  "open location": '',
}

class Box extends Component {
  render() {
    let source = this.props.data
    return (
      <div className='flex-container column' style={{ margin: 5 + 'px' }} >
            {/*<Button type="primary" ghost>Primary Ghost</Button>
    <Button ghost>Default Ghost</Button>
    <Button type="dashed" ghost>Dashed Ghost</Button>*/}

        <div className='flex-item left'>{source.name}</div>
        <div className='flex-item' style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          direction:'rtl',
          width: 60 + '%',
          fontSize: 10 +'px',
          cursor: 'pointer',
           margin:1+'px',
          display: 'inline-block',
        }}>{source.path}</div>
        <div className='flex-item space-between right'>
          <Button type="primary" className='flex-item' onClick={this.props.locationClickHandler.bind(this, this.props.data)}> Reveal </Button>
          <Button type="primary" className='flex-item' onClick={this.props.clickHandler.bind(this, this.props.data)}> Open </Button>
        </div>
        <br/>

      </div>
    );
  }
}

class BoxList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      filtered:[]
    }
    PubSub.subscribe('ReposList', this.handleFiltering.bind(this))
    
  }
  handleFiltering(msg , data) {
    const filteredData =  mySubscriber( msg, data )
      this.setState({
        filtered: filteredData
      })
  }
  filter(str='') {
    var arr = this.props.dataSource 
    return arr.filter( x => x.path.includes(str))
  }
  
  render() {
    let source = this.state.filtered || this.props.dataSource || []
    // let source = filteredSource || this.props.dataSource
    console.log(source)
    let onClickHandler = this.props.onRowClick
    let locationClickHandler = this.props.onRowClickOpenFinder
    source = source.map((x, i) => {
      return <Box
        data={x}
        key={i}
        clickHandler={onClickHandler.bind(this)}
        locationClickHandler={locationClickHandler.bind(this)}
      />
    })
    
    return (
      <div style={{ background: "#CCCCCC", margin: 20+'px'}} >
       {source}
      </div>
    );
  }
}

export default BoxList;
