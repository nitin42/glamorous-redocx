import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import getStyles from './styles';
import CHANNEL from './constants';

/**
 * returns glamorous component factory
 * @param {*} splitProps split the component props
 */
export default function createGlamorous(splitProps) {
  /**
   * glamorous constructor
   * @param {*} comp component name
   * @param {*} param0 display name of the component
   * @param {*} param1 forward props (extra props)
   * @param {*} param2 rootEl (root element)
   * @param {*} param3 propsAreStyleOverrides (built in glamorous component)
   */
  return function glamorous(
    comp,
    /* eslint-disable no-unused-vars */
    { displayName, forwardProps = [], rootEl, propsAreStyleOverrides } = {},
  ) {
    /* eslint-disable no-use-before-define */
    return glamorousComponentFactory;

    /**
     * returns a glamorous component
     * @param {*} styles Redocx styles
     */
    function glamorousComponentFactory(...styles) {
      class GlamorousComponent extends React.Component {
        state = { theme: null };

        /**
         * set the theme
         */
        componentWillMount() {
          /* eslint-disable react/prop-types */
          const { theme } = this.props;

          if (this.context[CHANNEL]) {
            /* eslint-disable no-unneeded-ternary */
            this.setTheme(theme ? theme : this.context[CHANNEL].getState());
          } else {
            this.setTheme(theme || {});
          }
        }

        /**
         * Subscribe to the store which has a theme object
         */
        componentDidMount() {
          if (this.context[CHANNEL] && !this.props.theme) {
            this.unsubscribe = this.context[CHANNEL].subscribe(this.setTheme);
          }
        }

        /**
         * update the new theme
         * @param {*} nextProps new theme
         */
        componentWillReceiveProps(nextProps) {
          if (this.props.theme !== nextProps.theme) {
            this.setTheme(nextProps.theme);
          }
        }

        /**
         * clear all the subscriptions
         */
        componentWillUnmount() {
          /* eslint-disable no-unused-expressions */
          this.unsubscribe;
        }

        /** set the new theme */
        setTheme = theme => this.setState({ theme });

        render() {
          const props = this.props;

          const { styleOverrides, toForward } = splitProps(props, GlamorousComponent);

          /** returns an array of styles */
          const applyStyles = getStyles(styles, props, this.state.theme);

          /** Component props and the extra props to be forwarded */
          const compProps = { ...props, ...toForward };

          return React.createElement(GlamorousComponent.comp, {
            ...compProps,
            style: _.extend.apply(null, [{}].concat(applyStyles, styleOverrides)) || {},
          });
        }
      }

      GlamorousComponent.comp = comp;

      GlamorousComponent.contextTypes = {
        [CHANNEL]: PropTypes.object,
      };

      /**
       * create a new component by extending the styles of old component
       * @param {*} newComp new component
       * @param {*} options options
       */
      function withComponent(newComp, options = {}) {
        return glamorous(comp, {
          forwardProps: GlamorousComponent.forwardProps,
          ...options,
        })(...GlamorousComponent.styles);
      }

      /**
       * assign component data to the glamorous constructor
       */
      Object.assign(
        GlamorousComponent,
        getGlamorousComponentMetadata({
          comp,
          styles,
          displayName,
          forwardProps,
          rootEl,
        }),
        { withComponent },
      );

      return GlamorousComponent;
    }
  };
}

/**
 * returns data about the component
 * @param {*} param0 component
 * @param {*} param1 displayName - display name of the component and component styles
 * @param {*} param2 styles - component styles
 * @param {*} param3 rootEl - represent the root element
 * @param {*} param4 forwardProps - extra props to be forwarded to the component
 */
function getGlamorousComponentMetadata({ comp, displayName, styles, rootEl, forwardProps }) {
  const componentsComp = comp.comp ? comp.comp : comp;

  return {
    comp: componentsComp,
    styles: when(comp.styles, styles),
    rootEl: rootEl || componentsComp,
    forwardProps: when(comp.forwardProps, forwardProps),
    displayName: displayName || `glamorous(${getDisplayName(comp)})`,
  };
}

/**
 * Merge the styles
 * @param {*} comp component
 * @param {*} prop component props
 */
function when(comp, prop) {
  return comp ? comp.concat(prop) : prop;
}

/**
 * returns the display name of the component
 * @param {*} comp component
 */
function getDisplayName(comp) {
  return typeof comp === 'string' ? comp : comp.displayName || comp.name || 'unknown';
}
