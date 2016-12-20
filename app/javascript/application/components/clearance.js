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
      <VelocityTransitionGroup component="div" className="clearance"
        enter={{ animation: { opacity: 1 }, duration: 500 }}
        leave={{ animation: { opacity: 0 }, duration: 500 }}
      >
        {this.contents()}
      </VelocityTransitionGroup>
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

  animation() {
    return {
      enter: { animation: { opacity: 1 }, duration: 1000 },
      leave: { animation: { opacity: 0 }, duration: 1000 },
    }

    const { user } = this.props;

    if (user && user.id) {
      return {
        enter: { animation: {}, duration: 5000 },
        leave: {
          animation: { translateY: ['-110%', 'easeInCubic'] },
          duration: 5000
        }
      }
    } else {
      return {
        enter: {
          animation: { translateY: [0, 'easeOutCubic'] },
          style: { translateY: '-110%' },
          duration: 5000
        },
        leave: { animation: {}, duration: 5000 }
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
