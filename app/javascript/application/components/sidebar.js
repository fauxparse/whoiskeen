import React from 'react'
import { connect } from 'react-redux'
import { logOut, toggleSidebar } from '../actions'

class Sidebar extends React.Component {
  render() {
    const { visible, toggle } = this.props;

    return (
      <aside className="sidebar" aria-hidden={!visible}
        onClick={toggle}>
        <button onClick={() => this.props.logOut()}>Log out</button>
      </aside>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    visible: state.sidebar
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut()),
    toggle: () => dispatch(toggleSidebar())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
