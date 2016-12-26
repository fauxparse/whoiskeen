import React from 'react'
import { VelocityComponent, VelocityTransitionGroup } from 'velocity-react'
import Animations from '../animations'
import Modal from './modal'

export default class FloatingActionButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: false, modalOpen: false }
  }

  render() {
    return (
      <div className={this.className()}>
        <VelocityTransitionGroup
          className="button"
          enter={{
            animation: Animations.FloatingActionButton.In,
            style: { scale: 0, rotateZ: -90 },
            duration: 125, delay: 125, stagger: 125
          }}
          leave={{
            animation: Animations.FloatingActionButton.Out,
            duration: 125, stagger: 125, backwards: true
          }}
          runOnMount={true}>
          {this.circle()}
          {this.button()}
        </VelocityTransitionGroup>
        {this.contents()}
      </div>
    )
  }

  circle() {
    if (this.props.modal) {
      return (
        <div key="circle" className="circle-container">
          <svg className="circle" viewBox="0 0 56 56"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="28" cy="28" r="28" onClick={() => this.toggle()}/>
          </svg>
        </div>
      )
    }
  }

  button() {
    const { modal, location, icon } = this.props
    if (modal) {
      return (
        <button key={this.props.location.pathname} {...this.buttonProps()}
          onClick={() => this.toggle()}>
          {this.props.icon}
        </button>
      )
    }
  }

  buttonProps() {
    return _.omit(this.props, ['icon', 'show', 'onClick', 'location', 'modal'])
  }

  contents() {
    const { modal } = this.props
    if (modal) {
      return (
        <Modal open={this.state.modalOpen}
          onClose={() => this.toggle()}>
          {React.cloneElement(modal)}
        </Modal>
      )
    }
  }

  className() {
    const { className, modal } = this.props
    const { open } = this.state
    return _.filter([
      'floating-action-button',
      className,
      open && 'open',
      modal && 'visible'
    ])
      .join(' ')
  }

  toggle() {
    if (this.state.open) {
      this.setState({ modalOpen: false })
      setTimeout(() => this.setState({ open: false }), 125)
    } else {
      this.setState({ open: true })
      setTimeout(() => this.setState({ modalOpen: true }), 125)
    }
  }
}
