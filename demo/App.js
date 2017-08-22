import React from 'react';
import { Document, render } from 'redocx';

import BasicExample from '../examples/basic';

// Uncomment any one of the below import to see what they render

// import ThemeProviderExample from '../examples/themeProvider';
// import WithThemeExample from '../examples/withTheme';
// import StyleOverrides from '../examples/styleOverrides';
// import ForwardProps from '../examples/forwardProps';
// import WithComponent from '../examples/withComponent';

class App extends React.Component {
  render() {
    return (
      <Document>
        <BasicExample />
      </Document>
    );
  }
}

render(<App />, `${__dirname}/example.docx`);
