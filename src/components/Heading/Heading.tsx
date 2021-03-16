import cx from 'classnames/dedupe'
import { mapValues } from 'lodash'
import React, { HTMLAttributes } from 'react'
import { colors } from '../../base/colors'
import {
  marginMixin,
  MarginMixin,
  paddingMixin,
  PaddingMixin
} from '../../base/spacing'

export const headingSizes = {
  'heading-1': 'drac-heading-1',
  'heading-2': 'drac-heading-2',
  'heading-3': 'drac-heading-3',
  'heading-4': 'drac-heading-4',
  'heading-5': 'drac-heading-5',
  'heading-6': 'drac-heading-6'
}

export const headingColors = mapValues(colors, (className) => {
  return className.replace('-bg-', '-text-')
})

/** Heading Props */
export interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    MarginMixin,
    PaddingMixin {
  /**
   * The size and type of Heading to be used.
   * Denotes hierarchy.
   */
  size?: keyof typeof headingSizes

  /**
   * The Dracula UI color to be applied to the Heading.
   */
  color?: keyof typeof headingColors

  as?: keyof HTMLElementTagNameMap
}

/**
 * Heading is used to display headlines and other forms of hierarchical Text.
 *
 * Headings are similar to the base Text component, but restricted to certain
 * sizes and font weight.
 */
export const Heading: React.FC<HeadingProps> = (props: HeadingProps) => {
  const tag = {
    'heading-1': 'h1',
    'heading-2': 'h2',
    'heading-3': 'h3',
    'heading-4': 'h4',
    'heading-5': 'h5',
    'heading-6': 'h6'
  }

  const size = tag[props.size ?? 'heading-1']
  const finalProps = {
    ...props,
    className: cx(
      `drac-heading`,
      headingSizes[props.size ?? 'heading-1'],
      headingColors[props.color ?? 'white'],
      ...paddingMixin(props),
      ...marginMixin(props)
    )
  }

  return React.createElement(finalProps.as ?? size, finalProps, props.children)
}

Heading.displayName = 'Heading'