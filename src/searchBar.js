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
    this.setState({
      dataSource: !value ? [] : [
        value,
        value + value,
        value + value + value,
      ],
    });
  }

  render() {
    const { dataSource } = this.state;
    return (
      <AutoComplete
        dataSource={dataSource}
        style={{ width: 200 }}
        onSelect={onSelect}
        onChange={this.handleChange}
        placeholder="input here"
      />
    );
  }
}

