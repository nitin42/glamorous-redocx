import React from 'react';
import glamorous from '../src';

const MyComponent = ({shouldRender, ...rest}) => (
  shouldRender ? <glamorous.TEXT {...rest}>This is a glamorous component</glamorous.TEXT> : null
)
const MyStyledComponent = glamorous(MyComponent, {
  forwardProps: ['shouldRender'],
  rootEl: 'Text', // This renders to 'TEXT'
})(props => ({
  fontSize: props.big ? 36 : 24,
}))

class ForwardProps extends React.Component {
  render() {
    return (
      <MyStyledComponent shouldRender={true} big>This is a glamorous component</MyStyledComponent>
    )
  }
}

export default ForwardProps;