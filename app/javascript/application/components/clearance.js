import React from 'react'
import { connect } from 'react-redux'
import { VelocityTransitionGroup } from 'velocity-react'
import fetch from '../lib/fetch'
import User from '../models/user'
import LoginForm from './login_form'
import { getLoggedInUser, loggedIn } from '../actions'

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
    const { user } = this.props;
    const none = {
      animation: { translateY: 0 },
      style: { translateY: 0 },
      duration: 500
    }

    if (user && user.id) {
      return {
        enter: none,
        leave: {
          animation: { translateY: ['-110vh', [0.5, -0.25, 0.5, 1]] },
          style: { translateY: 0 },
          duration: 500
        }
      }
    } else {
      return {
        leave: none,
        enter: {
          animation: { translateY: [0, [0.5, 0, 0.5, 1.25]] },
          style: { translateY: '-110vh' },
          duration: 500
        }
      }
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
