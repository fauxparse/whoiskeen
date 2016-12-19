import React from 'react'
import { connect } from 'react-redux'
import { logOut } from '../actions'

class Application extends React.Component {
  render() {
    return (
      <div className="application">
        Bonjour!
        <button onClick={() => this.props.logOut()}>Log out</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Application)
