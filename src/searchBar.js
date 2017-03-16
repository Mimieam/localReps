import React from 'react';
import { AutoComplete } from 'antd';

function onSelect(value) {
  console.log('onSelect', value);
}

export class Complete extends React.Component {
  state = {
    dataSource: [],
  }

  handleChange = (value) => {
    value = value.toLowerCase()
    let data = this.props.dataSource.filter((x,i) => {
         x.key = i
        return x.text.toLowerCase().includes(value)
      })
      data = data.map((x) =>  x.text)
    if (value === "") {
      data = []
    }

    this.setState({
      dataSource: data
    });
  }

  render() {
    const { dataSource } = this.state;
    return (
      <AutoComplete
        dataSource={dataSource}
        style= {this.props.style || {}}
        onSelect={onSelect}
        onChange={this.handleChange}
        filterOption={false}
        placeholder="looking for a repo ?"
      />
    );
  }
}

