import React from 'react'
import { VelocityComponent, VelocityTransitionGroup } from 'velocity-react'

export default class FloatingActionButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
  }

  render() {
    const { open } = this.state

    return (
      <div className={this.className()}>
        <svg className="circle" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
          <circle cx="28" cy="28" r="28" onClick={() => this.toggle()}/>
        </svg>
        <button {..._.omit(this.props, ['icon', 'onClick'])} onClick={() => this.toggle()}>
          {this.props.icon}
        </button>
        {this.contents()}
      </div>
    )
  }

  contents() {
    return React.cloneElement(this.props.children, {
      open: this.state.open,
      onClose: () => this.setState({ open: false })
    })
  }

  className() {
    const { className } = this.props
    const { open } = this.state
    return _.filter(['floating-action-button', className, open && 'open']).join(' ')
  }

  toggle() {
    this.setState({ open: !this.state.open })
  }
}