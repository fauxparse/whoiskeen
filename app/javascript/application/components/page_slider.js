import React, { Component } from 'react'
import { VelocityTransitionGroup } from 'velocity-react'
import Animations from '../animations'

class PageSlider extends Component {
  render() {
    const { component, className, children } = this.props;
    return (
      <VelocityTransitionGroup component={component || "section"}
        className={className || 'page-slider'} {...this.pageAnimation()}>
        {children}
      </VelocityTransitionGroup>
    )
  }

  pageAnimation() {
    const direction = this.props.direction || PageSlider.LEFT;
    return {
      enter: {
        animation: Animations.Page.In,
        style: {
          translateX: `${direction * 100}%`,
          opacity: 0
        }
      },
      leave: {
        animation: direction > 0 ? Animations.Page.Left : Animations.Page.Right
      }
    }
  }
}

PageSlider.LEFT = 1
PageSlider.RIGHT = -1

export default PageSlider
