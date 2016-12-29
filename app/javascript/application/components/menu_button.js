import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { showSidebar } from '../actions'

class MenuButton extends React.Component {
  render() {
    const { state } = this.props
    return (
      <button rel="menu" data-state={this.buttonState()}
        onClick={this.clicked.bind(this)}>
        <svg width={24} height={24} viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <rect x={3} y={6} width={18} height={2}/>
          <rect x={3} y={11} width={18} height={2}/>
          <rect x={3} y={16} width={18} height={2}/>
        </svg>
      </button>
    )
  }

  buttonState() {
    const { sidebar, pathname } = this.props

    if (sidebar) {
      return 'open'
    } else {
      if ((pathname || '').split('/').length > 2) {
        return 'back'
      } else {
        return 'menu'
      }
    }
  }

  clicked() {
    const { go, showSidebar, pathname } = this.props
    switch(this.buttonState()) {
    case 'menu':
      return showSidebar()
    case 'back':
      return go(this.backUrl())
    }
  }

  backUrl() {
    const { pathname } = this.props
    const parts = pathname.replace(/\/$/, '').split('/')
    if (parts.length === 3 && parts[1] == 'teams') {
      return '/teams'
    } else {
      return parts.slice(0, -2).join('/')
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    sidebar: state.sidebar,
    pathname: state.routing.locationBeforeTransitions.pathname
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showSidebar: () => dispatch(showSidebar()),
    go: (url) => dispatch(push(url))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuButton)
