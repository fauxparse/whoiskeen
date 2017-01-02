import React from 'react'
import { VelocityTransitionGroup } from 'velocity-react'
import classNames from '../lib/class_names'
import Animations from '../animations'

export default ({ className, children, direction }) => (
  <VelocityTransitionGroup
    component="ul"
    className={classNames(className)}
    enter={{
      animation: Animations.Page.In,
      style: { translateX: `${(direction || 1) * 20}%`, opacity: 0 },
      stagger: 25
    }}
    leave={{
      animation: Animations.Page.Right,
      stagger: 25,
      backwards: true
    }}
    runOnMount={true}>
    {children}
  </VelocityTransitionGroup>
)
