import React from 'react';
import glamorous from '../src';

const Title = glamorous.Text({
  color: 'pink',
  fontSize: 40
})

const TitleTwo = Title.withComponent('Text')

class WithComponent extends React.Component {
  render() {
    return (
      <TitleTwo>
        This is a glamorous component
      </TitleTwo>
    )
  }
}

export default WithComponent;