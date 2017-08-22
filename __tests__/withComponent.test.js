import React from 'react'
import {render} from 'enzyme'
import serializer from 'jest-glamor-react'
import glamorous from '../src/'

expect.addSnapshotSerializer(serializer)

test('withComponent composes the component with provided styles', () => {
  const Title = glamorous.Text({fontSize: 20})
  const TitleTwo = Title.withComponent('Text')
  expect(render(<TitleTwo />)).toMatchSnapshot()
})

test('withComponent creates a new component with the provided tag', () => {
  const Text = glamorous.Text({color: 'red', fontSize: 20})
  const NewText = Text.withComponent('Text')

  /** redocx exports component as UPPERCASE names which transpile to function call with createElement('ELEMENT_NAME') */
  expect(typeof Text.comp).toBe('string')
  expect(typeof NewText.comp).toBe('string')
})

test('forwardProps are applied to the new component', () => {
  const forwardProps = ['shouldRender']
  const Text = glamorous(
    ({shouldRender, ...props}) => (shouldRender ? <glamorous.TEXT {...props} /> : null),
    {forwardProps},
  )({color: 'red', fontSize: 20})
  const View = Text.withComponent('Text')
  expect(View.forwardProps).toEqual(forwardProps)
})

test('forwardProps can be overridden for the new component', () => {
  const Text = glamorous(
    ({shouldRender, ...props}) => (shouldRender ? <glamorous.TEXT {...props} /> : null),
    {forwardProps: ['shouldRender']},
  )({color: 'red', fontSize: 20})
  const forwardProps = ['other-thing']
  const View = Text.withComponent('Text', {forwardProps})
  expect(View.forwardProps).toEqual(forwardProps)
})

test('forwards options', () => {
  const Text = glamorous.Text({color: 'red', fontSize: 20})
  const View = Text.withComponent('Text', {displayName: 'Text'})
  expect(View.displayName).toBe('Text')
})