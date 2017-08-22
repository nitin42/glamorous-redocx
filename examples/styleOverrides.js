import React from 'react';
import glamorous from '../src';

class StyleOverrides extends React.Component {
  render() {
    return (
      <glamorous.DOCUMENT align='center'>
        <glamorous.TEXT color='mistyrose' bold={true} fontSize={40}>
          This is a glamorous component
        </glamorous.TEXT>
      </glamorous.DOCUMENT>
    )
  }
}

export default StyleOverrides;