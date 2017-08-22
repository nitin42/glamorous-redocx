import React from 'react';
import glamorous, { ThemeProvider, withTheme } from '../src';

const theme = {
  styledTheme: {
    color: 'mistyrose'
  }
}

const SubTitle = ({ children, theme }) =>
<glamorous.TEXT style={{ color: theme.styledTheme.color }}>
  {children}
</glamorous.TEXT>;

// extended component with theme prop
const ThemedSubTitle = withTheme(SubTitle);

class WithThemeExample extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <ThemedSubTitle>This is a themed component</ThemedSubTitle>
      </ThemeProvider>
    )
  }
}

export default WithThemeExample;