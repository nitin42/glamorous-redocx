import React from 'react';
import glamorous from '../src';

const Title = glamorous.Text({
  color: 'green',
  fontSize: 25,
  bold: true
})

class BasicExample extends React.Component {
  render() {
    return (
      <Title>This is a glamorous component</Title>
    )
  }
}

export default BasicExample;