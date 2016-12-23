import React from 'react'
import { VelocityTransitionGroup } from 'velocity-react'

export default class Modal extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { open } = this.props
    return (
      <VelocityTransitionGroup
        enter={{ animation: { translateY: [0, 'ease-out'], opacity: 1 }, duration: 500 }}
        leave={{ animation: { translateY: ['100vh', 'ease-in'], opacity: 0 }, duration: 500 }}
        runOnMount={true}
        className={this.className()}
        onClick={this.backgroundClicked.bind(this)}>
        {this.contents()}
      </VelocityTransitionGroup>
    )
  }

  contents() {
    if (this.props.open) {
      return (
        <div className="modal" key="modal" onClick={(e) => e.stopPropagation()}>
          {React.cloneElement(this.props.children, { close: () => this.close()})}
        </div>
      )
    }
  }

  className() {
    const { open, className } = this.props
    return _.filter(['modal-container', className, open && 'open']).join(' ')
  }

  close() {
    const { onClose } = this.props
    if (onClose) { onClose() }
  }

  backgroundClicked(e) {
    e.stopPropagation()
    this.close()
  }
}
