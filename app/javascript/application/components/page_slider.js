import React, { Component } from 'react'
import { connect } from 'react-redux'
import { VelocityTransitionGroup } from 'velocity-react'
import Animations from '../animations'

class PageSlider extends Component {
  constructor(props) {
    super(props)
    this.state = { defaultDirection: PageSlider.LEFT, pathname: '' }
  }

  render() {
    const { component, children } = this.props;

    var className = _.filter([this.props.className, 'page-slider']).join(' ')

    return (
      <VelocityTransitionGroup component={component || "section"}
        className={className} {...this.pageAnimation()}>
        {children}
      </VelocityTransitionGroup>
    )
  }

  componentWillReceiveProps(newProps) {
    const oldPath = this.state.pathname
    const { pathname } = newProps

    if (oldPath < pathname) {
      this.setState({ defaultDirection: PageSlider.LEFT, pathname })
    } else {
      this.setState({ defaultDirection: PageSlider.RIGHT, pathname })
    }
  }

  pageAnimation() {
    const direction = this.props.direction || this.state.defaultDirection;
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

const mapStateToProps = (state, ownProps) => {
  return {
    pathname: state.routing.locationBeforeTransitions.pathname
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return { }
}

export default _.assign(
  connect(mapStateToProps, mapDispatchToProps)(PageSlider),
  { LEFT: PageSlider.LEFT, RIGHT: PageSlider.RIGHT }
)
