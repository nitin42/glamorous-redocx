import createGlamorous from './createGlamorous';
import splitProps from './splitProps';
import ThemeProvider from './themeProvider';
import withTheme from './withTheme';

const glamorous = createGlamorous(splitProps);

const RedocxElements = ['Text', 'Document', 'Image', 'Header', 'Footer', 'List', 'NumberItem', 'BulletItem', 'Table'];

Object.assign(
  glamorous,
  RedocxElements.reduce((getters, tag) => {
    const docTag = tag.toUpperCase();
    /* eslint-disable no-param-reassign */
    getters[tag] = glamorous(docTag);
    return getters;
  }, {}),
);

Object.assign(
  glamorous,
  RedocxElements.reduce((container, tag) => {
    const docTag = tag.toUpperCase();
    container[docTag] = glamorous[tag]();
    container[docTag].displayName = `glamorous.${tag}`;
    container[docTag].propsAreStyleOverrides = true;
    return container;
  }, {}),
);

export default glamorous;

export { ThemeProvider, withTheme };
