import React from 'react'
import { connect } from 'react-redux'
import { VelocityTransitionGroup } from 'velocity-react'
import fetch from '../lib/fetch'
import User from '../models/user'
import LoginForm from './login_form'
import { getLoggedInUser, loggedIn } from '../actions'
import Animations from '../animations'

class Loading extends React.Component {
  render() {
    return <div className="loading-screen">Loading…</div>
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
        <Loading/>
        <VelocityTransitionGroup {...this.animation()}>
          {this.contents()}
        </VelocityTransitionGroup>
      </div>
    )
  }

  contents() {
    const { user } = this.props;

    if (user) {
      if (user.id) {
        return React.cloneElement(this.props.children, { key: 'logged-in' })
      } else {
        return <LoginForm user={user} key="login" />
      }
    }
  }

  animation() {
    const { user } = this.props, loggedIn = user && user.id;

    const enter = {
      animation: Animations.Login.Screen.In,
      style: { translateY: '-110%' }
    }

    const leave = {
      animation: Animations.Login.Screen.Out,
      style: { translateY: 0 }
    }

    const none = {
      animation: { translateY: 0 },
      style: { translateY: 0 },
      duration: 500
    }

    return {
      enter: loggedIn ? none : enter,
      leave: loggedIn ? leave : none
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
