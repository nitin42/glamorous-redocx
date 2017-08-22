import React from 'react';
import PropTypes from 'prop-types';
import CHANNEL from './constants';

export default function withTheme(ComponentToTheme) {
  class ThemedComponent extends React.Component {
    state = { theme: {} };

    componentWillMount() {
      this.setState({ theme: this.context[CHANNEL].getState() });
    }

    componentDidMount() {
      if (this.context[CHANNEL]) {
        this.unsubscribe = this.context[CHANNEL].subscribe(this.setTheme);
      }
    }

    componentWillUnmount() {
      /* eslint-disable no-unused-expressions */
      this.unsubscribe;
    }

    setTheme = theme => this.setState({ theme });

    render() {
      /* eslint-disable react/jsx-filename-extension */
      return <ComponentToTheme {...this.props} {...this.state} />;
    }
  }

  ThemedComponent.contextTypes = {
    [CHANNEL]: PropTypes.object,
  };

  return ThemedComponent;
}
