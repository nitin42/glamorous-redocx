import React from 'react';
import { render, mount } from 'enzyme';
import serializer from 'jest-glamor-react';
import renderer from 'react-test-renderer';
import glamorous from '../src/index';

expect.addSnapshotSerializer(serializer)

test('sanity test', () => {
  const TextComponent = glamorous.Text({color: 'red'})

  const tree = renderer.create(
    <TextComponent>Hello World</TextComponent>
  ).toJSON()

  expect(tree).toMatchSnapshot()
});

test('should not throw any error when called glamorous.primitive()', () => {
  glamorous.Text({})
})

test('should attach a displayName', () => {
  const TextComponent = glamorous.Text({})
  const ImageComponent = glamorous.Image({})
  const BulletComponent = glamorous.BulletItem({})
  const NumberComponent = glamorous.NumberItem({})

  expect(TextComponent.displayName).toBe('glamorous(TEXT)')
  expect(ImageComponent.displayName).toBe('glamorous(IMAGE)')
  expect(BulletComponent.displayName).toBe('glamorous(BULLETITEM)')
  expect(NumberComponent.displayName).toBe('glamorous(NUMBERITEM)')
})

test('should render a component with theme properties', () => {
  const Component = glamorous.Text(
    {
      color: 'red',
    },
    (props, theme) => ({fontSize: theme.size}),
  )
  expect(
    render(<Component theme={{size: 20}} />),
  ).toMatchSnapshot()
})

test('should pass an updated theme when theme prop changes', () => {
  const Component = glamorous.Text(
    {
      color: 'red',
    },
    (props, theme) => ({fontSize: theme.size}),
  )
  const wrapper = mount(<Component theme={{size: 10}} />)
  expect(wrapper).toMatchSnapshot(
    `with theme prop of size 10`,
  )
  wrapper.setProps({theme: {padding: 20}})
  expect(wrapper).toMatchSnapshot(
    `with theme prop of size 20`,
  )
})

test('should render the <Image /> component', () => {
  const ImageComponent = glamorous.Image({width: 100})
  expect(
    <ImageComponent src="./redocx.png" />,
  ).toMatchSnapshot()
})

test('supports props as style properties', () => {
  const tree = renderer.create(
    <glamorous.TEXT color="pink">Hello World</glamorous.TEXT>
  ).toJSON()

  expect(tree).toMatchSnapshot()
})
