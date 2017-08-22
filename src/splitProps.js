const COMMON_PROPS = ['align', 'style'];

const TextElements = ['TEXT', 'NUMBERITEM', 'BULLETITEM', 'FOOTER', 'HEADER'];
const TextProps = COMMON_PROPS;

const TableElement = 'TABLE';
const TableProps = ['headers', 'data', 'style'];

const ImageElement = 'IMAGE';
const ImageProps = ['width', 'height', 'style', 'align'];

const WrapperElements = 'DOCUMENT';
const WrapperProps = ['align', 'style', 'info'];

const ListWrapper = 'LIST';
const ListProps = COMMON_PROPS;

/**
 * Currently supported style attribute for redocx components
 * @param {*} propName prop name
 */
function isStyleAttribute(propName) {
  const styleAttrs = [
    'fontSize',
    'color',
    'backgroundColor',
    'bold',
    'border',
    'borderColor',
    'fontSize',
    'fontFace',
    'highlight',
    'italic',
    'link',
    'underline',
    'width',
    'height',
    'align',
  ];

  return styleAttrs.includes(propName);
}

/**
 * Check whether it redocx prop or not
 * @param {*} rootEl root element
 * @param {*} prop component prop
 */
function isRedocxProp(rootEl, prop) {
  const REDOCX_ELEMENT = rootEl.toUpperCase();

  if (TextElements.indexOf(REDOCX_ELEMENT) > -1) {
    return TextProps.indexOf(prop) > -1;
  }

  if (TableElement === REDOCX_ELEMENT) {
    return TableProps.indexOf(prop) > -1;
  }

  if (ImageElement === REDOCX_ELEMENT) {
    return ImageProps.indexOf(prop) > -1;
  }

  if (WrapperElements === REDOCX_ELEMENT) {
    return WrapperProps.indexOf(prop) > -1;
  }

  if (ListWrapper === REDOCX_ELEMENT) {
    return ListProps.indexOf(prop) > -1;
  }

  return false;
}

/**
 * Check whether the property can be passed to a component
 * @param {*} rootEl root element
 * @param {*} prop prop name
 */
function shouldForwardProperty(rootEl, prop) {
  return typeof rootEl !== 'string' && !isRedocxProp(rootEl, prop);
}

/**
 * Split the component props
 * @param {*} props Component props
 * @param {*} component Component
 */
export default function splitProps(props, component) {
  const { rootEl, forwardProps } = component;

  const returnValue = { styleOverrides: {}, toForward: {} };

  return Object.keys(props).reduce((container, prop) => {
    if (forwardProps.indexOf(prop) !== -1 || shouldForwardProperty(rootEl, prop)) {
      /* eslint-disable  no-param-reassign */
      container.toForward[prop] = props[prop];
    } else if (isStyleAttribute(prop)) {
      /* eslint-disable  no-param-reassign */
      container.styleOverrides[prop] = props[prop];
    }
    return container;
  }, returnValue);
}
