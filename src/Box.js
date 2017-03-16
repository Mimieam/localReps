import React, { Component } from 'react';

import { Button } from 'antd';




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
        <Button type='dashed' type="primary" className='flex-item right'>Open </Button>
        <br/>

      </div>
    );
  }
}

class BoxList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    }
  }
  render() {
    let source = this.props.dataSource || []
    source = source.map((x, i) => <Box data={x} key={i} />)
    return (
      <div style={{ background: "#CCC", margin: 20+'px'}}>
       {source}
      </div>
    );
  }
}

export default BoxList;
