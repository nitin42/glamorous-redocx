import React, {Component} from 'react'
import {render, mount} from 'enzyme'
import glamorous from '../src'
import withTheme from '../src/withTheme'
import ThemeProvider from '../src/themeProvider'
import CHANNEL from '../src/constants'

const getMockedContext = unsubscribe => ({
  [CHANNEL]: {
    getState: () => {},
    setState: () => {},
    subscribe: () => unsubscribe,
  },
})

const mockComp = glamorous.Text({})

test('renders a non-glamorous component with theme', () => {
  const CompWithTheme = withTheme(({theme: {fontSize}}) => (
    <glamorous.TEXT style={{fontSize}} />
  ))
  expect(
    render(
      <ThemeProvider theme={{fontSize: 10}}>
        <CompWithTheme />
      </ThemeProvider>,
    ),
  ).toMatchSnapshot()
})

test('theme properties updates get propagated down the tree', () => {
  class Parent extends Component {
    state = {
      fontSize: 10,
    }

    render() {
      return (
        <ThemeProvider theme={{fontSize: this.state.fontSize}}>
          <Child />
        </ThemeProvider>
      )
    }
  }

  const Child = withTheme(({theme: {fontSize}}) => <glamorous.TEXT style={{fontSize}} />)
  const wrapper = mount(<Parent />)
  expect(wrapper).toMatchSnapshot(`with theme prop of fontSize 10`)
  wrapper.setState({fontSize: 20})
  expect(wrapper).toMatchSnapshot(`with theme prop of fontSize 20`)
})

test('works properly with classes', () => {
  /* eslint-disable react/prefer-stateless-function */
  class Child extends Component {
    render() {
      const {theme: {fontSize}} = this.props
      return <glamorous.TEXT style={{fontSize}} />
    }
  }

  const ChildWithTheme = withTheme(Child)

  class Parent extends Component {
    state = {
      fontSize: 10,
    }

    render() {
      return (
        <ThemeProvider theme={{fontSize: this.state.fontSize}}>
          <ChildWithTheme />
        </ThemeProvider>
      )
    }
  }

  const wrapper = mount(<Parent />)
  expect(wrapper).toMatchSnapshot(`with theme prop of fontSize 10`)
})

test('unsubscribes from theme updates on unmount', () => {
  const Child = withTheme(() => <glamorous.TEXT />)
  const unsubscribe = jest.fn()
  const context = getMockedContext(unsubscribe)
  const wrapper = mount(<ThemeProvider theme={{}}><Child /></ThemeProvider>, {
    context,
  })
  wrapper.unmount()
  expect(unsubscribe).toHaveBeenCalled()
})
