import React, {Component} from 'react'
import {render, mount} from 'enzyme'
import serializer from 'jest-glamor-react'
import glamorous from '../src/'
import ThemeProvider from '../src/themeProvider'
import {CHANNEL} from '../src/constants'

expect.addSnapshotSerializer(serializer)

const getMockedContext = unsubscribe => ({
  [CHANNEL]: {
    getState: () => {},
    setState: () => {},
    subscribe: () => unsubscribe,
  },
})

test('renders a component with theme', () => {
  const Comp = glamorous.Text(
    {
      fontSize: 40,
    },
    (props, theme) => ({color: theme.color}),
  )
  expect(
    render(
      <ThemeProvider theme={{color: 'red'}}>
        <Comp />
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
  const Child = glamorous.Text(
    {
      color: 'red',
    },
    (props, theme) => ({fontSize: theme.fontSize}),
  )
  const wrapper = mount(<Parent />)
  expect(wrapper).toMatchSnapshot(`with theme prop of fontSize 10`)
  wrapper.setState({fontSize: 20})
  expect(wrapper).toMatchSnapshot(`with theme prop of fontSize 20`)
})

test('merges nested themes', () => {
  const One = glamorous.Text({}, (props, {fontSize, bold}) => ({
    fontSize,
    bold,
  }))
  const Two = glamorous.Text({}, (props, {fontSize, bold}) => ({
    fontSize,
    bold,
  }))
  expect(
    mount(
      <glamorous.DOCUMENT>
        <ThemeProvider theme={{fontSize: 10, bold: true}}>
          <glamorous.DOCUMENT>
            <One />
            <ThemeProvider theme={{fontSize: 20}}>
              <Two />
            </ThemeProvider>
          </glamorous.DOCUMENT>
        </ThemeProvider>
      </glamorous.DOCUMENT>,
    ),
  ).toMatchSnapshot()
})

test('renders if children are null', () => {
  expect(
    mount(
      <ThemeProvider theme={{fontSize: 10}}>
        {false && <glamorous.TEXT />}
      </ThemeProvider>,
    ),
  ).toMatchSnapshot()
})

test('does nothing when receive same theme via props', () => {
  const theme = {fontSize: 20}
  const wrapper = mount(<ThemeProvider theme={theme} />)
  expect(wrapper).toMatchSnapshot(`with theme prop of fontSize 20`)
  wrapper.setProps({theme})
  expect(wrapper).toMatchSnapshot(`with theme prop of fontSize 20`)
})