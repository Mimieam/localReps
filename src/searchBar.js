import React from 'react';
import PubSub from 'pubsub-js';
import { AutoComplete, Input } from 'antd';

function onSelect(value) {
  console.log('onSelect', value);
  
}

export class Complete extends React.Component {
  state = {
    dataSource: [],
  }

handleChange = (event) => {
  let value = event.target.value.toLowerCase()
  let dataObj = this.props.dataSource.filter((x, i) => {
      // console.log("dataOBJ", this.props.dataSource)
      x.key = i
      return x.text.toLowerCase().includes(value)
    })
  let data = dataObj.map((x) => x.text)
  if (value === "") {
    data = []
  }

  this.setState({dataSource: data});
  PubSub.publish('ReposList', dataObj)
  PubSub.publish('SeachBarValue', value)
}

  render() {
    // const { dataSource } = this.state;
    return (
      <Input type="text" onChange={this.handleChange.bind(this)}  style={this.props.style || {}} placeholder="looking for a repo ?" />
      /*<AutoComplete
        dataSource={dataSource}
        style= {this.props.style || {}}
        onSelect={onSelect}
        onChange={this.handleChange}
        filterOption={false}
        labelInValue = {false}
        placeholder="looking for a repo ?"
      />*/
    );
  }
}

