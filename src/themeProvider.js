import React from 'react';
import brcast from 'brcast';
import PropTypes from 'prop-types';
import CHANNEL from './constants';

export default class ThemeProvider extends React.Component {
  static childContextTypes = {
    [CHANNEL]: PropTypes.object.isRequired,
  };

  static contextTypes = {
    /* eslint-disable react/forbid-prop-types */
    [CHANNEL]: PropTypes.object,
  };

  static propTypes = {
    theme: PropTypes.object.isRequired,
    /* eslint-disable react/require-default-props */
    children: PropTypes.node,
  };

  getChildContext() {
    return {
      [CHANNEL]: this.broadcast,
    };
  }

  componentWillMount() {
    if (this.context[CHANNEL]) {
      this.setOuterTheme(this.context[CHANNEL].getState());
      this.broadcast.setState(this.getTheme());
    }
  }

  componentDidMount() {
    if (this.context[CHANNEL]) {
      this.unsubscribe = this.context[CHANNEL].subscribe(this.setOuterTheme);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.theme !== nextProps.theme) {
      this.broadcast.setState(this.getTheme(nextProps.theme));
    }
  }

  componentWillUnmount() {
    /* eslint-disable no-unused-expressions */
    this.unsubscribe && this.unsubscribe();
  }

  getTheme(passedTheme) {
    const theme = passedTheme || this.props.theme;
    return { ...this.outerTheme, ...theme };
  }

  setOuterTheme = (theme) => {
    this.outerTheme = theme;
  }

  broadcast = brcast(this.props.theme);

  render() {
    return this.props.children ? React.Children.only(this.props.children) : null;
  }
}
