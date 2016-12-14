import React from 'react'
import { connect } from 'react-redux'
import fetch from '../lib/fetch'
import User from '../models/user'
import LoginForm from './login_form'
import { getLoggedInUser, loggedIn } from '../actions'

class Loading extends React.Component {
  render() {
    return <div className="loading">Loading…</div>
  }
}

class Clearance extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.getLoggedInUser()
  }

  render() {
    return (
      <div className="clearance">
        {this.contents()}
      </div>
    )
  }

  contents() {
    const { user } = this.props;

    if (user) {
      if (user.id) {
        return this.props.children
      } else {
        return <LoginForm user={user} />
      }
    } else {
      return <Loading />
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getLoggedInUser: () => dispatch(getLoggedInUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Clearance)
