import React from 'react';
import glamorous, { ThemeProvider } from '../src';

const theme = {
  styledTheme: {
    color: 'mistyrose'
  }
}

const Comp = glamorous.Text(
	{
		fontSize: 40,
	},
	(props, theme) => ({ color: theme.styledTheme.color })
);

class ThemeProviderExample extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Comp>This is a themed component</Comp>
      </ThemeProvider>
    )
  }
}

export default ThemeProviderExample;