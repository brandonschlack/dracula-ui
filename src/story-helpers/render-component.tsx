import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import prettier from 'prettier'

Enzyme.configure({ adapter: new Adapter() })

export type ComponentExample = {
  html: string
  docs: string
  title: string
  react?: any
}

export type SnapshotBuilder = {
  comp: () => React.ReactElement
  docs: string
  title: string
}

export function buildSnapshot(
  title: string,
  comp: () => React.ReactElement,
  docs: string = ''
): SnapshotBuilder {
  return {
    title,
    comp,
    docs: docs.trim()
  }
}

export function renderSnapshot(
  title: string,
  comp: () => React.ReactElement,
  docs: string = ''
): ComponentExample {
  const html = mount(comp()).html()
  const react = comp.toString()

  const prettyHTML = prettier.format(html, {
    parser: 'html'
  })

  return {
    title,
    html: prettyHTML,
    react,
    docs
  }
}