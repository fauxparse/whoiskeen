import React from 'react'
import { connect } from 'react-redux'
import { VelocityTransitionGroup } from 'velocity-react'
import fetch from '../lib/fetch'
import { logIn } from '../actions'
import TextField from './text_field'
import User from '../models/user'

const LoginTab = ({ tab, label, mode }) => (
  <li role="tab" aria-selected={mode === tab}>
    <span onClick={() => this.switchMode(tab)}>{label}</span>
  </li>
)

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 'login',
      email: '',
      errors: {},
      password: '',
      loading: false
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(newProps) {
    const { email, errors } = newProps.user || new User;
    this.setState({
      email: (email || '').substr(0),
      errors: errors || {},
      loading: newProps.user ? false : this.state.loading
    })
  }

  render() {
    const { loading, mode } = this.state

    return (
      <div className="login-form">
        <form key="form" onSubmit={this.submit.bind(this)} data-mode={mode}>
          <ul key="tabs" role="tabs">
            <li role="tab" aria-selected={mode === 'login'}
              onClick={() => this.setState({ mode: 'login' })}>Log in</li>
            <li role="tab" aria-selected={mode === 'signup'}
              onClick={() => this.setState({ mode: 'signup' })}>Sign up</li>
            <li role="tab" aria-selected={mode === 'password'}
              onClick={() => this.setState({ mode: 'password' })}>Password</li>
          </ul>
          <fieldset disabled={loading}>
            <VelocityTransitionGroup
              enter={{ animation: { opacity: 1, height: [79, 'spring'] }, duration: 500, style: { opacity: 0, height: 0 } }}
              leave={{ animation: { opacity: 0, height: [0, [.5, -0.25, .5, 1]] }, duration: 500 }}>
              {this.emailField()}
              {this.passwordField()}
            </VelocityTransitionGroup>
            {this.submitButton(mode)}
          </fieldset>
        </form>
      </div>
    )
  }

  emailField() {
    return (
      <div key="email">
        <TextField type="email" name="email" value={this.state.email}
          label="Email address"
          onChange={this.handleChange} />
      </div>
    )
  }

  passwordField() {
    if (this.state.mode !== 'password') {
      return (
        <div key="password">
          <TextField type="password" name="password"
            value={this.state.password}
            label="Password"
            onChange={this.handleChange} />
        </div>
      )
    }
  }

  submitButton(mode) {
    const buttonText = {
      login: 'Log in',
      signup: 'Sign up',
      password: 'Request reset link'
    }[mode]

    return (
      <VelocityTransitionGroup component="button" key="submit" type="submit"
        enter={{ animation: { translateY: 0 }, style: { translateY: '-100%' }, duration: 250 }}
        leave={{ animation: { translateY: '100%' }, duration: 250 }}>
        <span key={mode}>{buttonText}</span>
      </VelocityTransitionGroup>
    )
  }

  switchMode(mode) {
    this.setState({ mode })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  submit(e) {
    const { email, password } = this.state
    e.preventDefault();
    this.setState({ loading: true })
    this.props.logIn(email, password)
  }
}

LoginForm.propTypes = {
  user: React.PropTypes.instanceOf(User)
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (email, password) => dispatch(logIn(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)