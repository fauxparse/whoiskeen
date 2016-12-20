require('lodash')
require('velocity-animate');
require('velocity-animate/velocity.ui');

import React from 'react'
import { connect } from 'react-redux'
import { VelocityTransitionGroup } from 'velocity-react'
import fetch from '../lib/fetch'
import { logIn, signUp, resetPassword } from '../actions'
import TextField from './text_field'
import User from '../models/user'
import Animations from '../animations'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 'login',
      email: '',
      errors: {},
      password: '',
      loading: false,
      resetSent: false
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(newProps) {
    const { mode } = this.state;
    const { email, errors } = newProps.user || new User;
    this.setState({
      email: (email || '').substr(0),
      errors: errors || {},
      loading: newProps.user ? false : this.state.loading,
      resetSent: email && mode === 'password'
    })
  }

  render() {
    const { loading, mode } = this.state

    const enterAnimation = {
      animation: Animations.Login.Field.In,
      stagger: 250,
      duration: 500,
      backwards: true,
      display: 'block',
      style: { display: 'none' }
    }

    const leaveAnimation = {
      animation: Animations.Login.Field.Out,
      stagger: 250,
      duration: 250,
      backwards: true
    }

    return (
      <div className="login-form">
        <div className="inner">
          <form key="form" onSubmit={this.submit.bind(this)} data-mode={mode}>
            <ul key="tabs" role="tabs">
              <li role="tab" rel="login" aria-selected={mode === 'login'}
                onClick={() => this.switchMode('login')}>
                {I18n.t('users.new.sign_in')}
              </li>
              <li role="tab" rel="signup" aria-selected={mode === 'signup'}
                onClick={() => this.switchMode('signup')}>
                {I18n.t('sessions.form.sign_up')}
              </li>
              <li role="tab" rel="password" aria-selected={mode === 'password'}
                onClick={() => this.switchMode('password')}>
                {I18n.t('sessions.form.forgot_password')}
              </li>
            </ul>
            <fieldset disabled={loading}>
              <VelocityTransitionGroup component="section"
                enter={enterAnimation}
                leave={leaveAnimation}>
                {this.emailField()}
                {this.passwordField()}
              </VelocityTransitionGroup>
              {this.resetMessage()}
              {this.submitButton(mode)}
              {this.errors()}
            </fieldset>
          </form>
        </div>
      </div>
    )
  }

  resetMessage() {
    const { mode, resetSent } = this.state

    if (mode === 'password' && resetSent) {
      return (
        <p>{I18n.t('passwords.create.description')}</p>
      )
    }
  }

  emailField() {
    const { mode, resetSent } = this.state

    if (mode !== 'password' || !resetSent) {
      return (
        <TextField key="email" type="email" name="email"
          value={this.state.email}
          label={I18n.t('activerecord.attributes.user.email')}
          onChange={this.handleChange} />
      )
    }
  }

  passwordField() {
    if (this.state.mode !== 'password') {
      return (
        <TextField key="password" type="password" name="password"
          value={this.state.password}
          label={I18n.t('activerecord.attributes.user.password')}
          onChange={this.handleChange} />
      )
    }
  }

  submitButton(mode) {
    const key = {
      login: 'session.submit',
      signup: 'user.create',
      password: 'password.submit'
    }[mode]

    if (mode !== 'password' || !this.state.resetSent) {
      return (
        <VelocityTransitionGroup component="button" key="submit" type="submit"
          enter={{
            animation: { translateY: 0, opacity: 1 },
            style: { translateY: '-100%', opacity: 0 },
            duration: 250
          }}
          leave={{
            animation: { translateY: '100%', opacity: 0 },
            duration: 250
          }}>
          <span key={mode}>{I18n.t(`helpers.submit.${key}`)}</span>
        </VelocityTransitionGroup>
      )
    }
  }

  errors() {
    const errors = _.flatten(_.values(this.state.errors || {}))

    if (errors.length) {
      return (
        <div className="errors">
          {errors.map((msg, i) => <p key={i}>{msg}</p>)}
        </div>
      )
    }
  }

  switchMode(mode) {
    this.setState({ mode, resetSent: false })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  submit(e) {
    const { mode, email, password } = this.state
    e.preventDefault();

    if (email && (password || (mode === 'password'))) {
      this.setState({ loading: true })

      if (mode === 'login') {
        this.props.logIn(email, password)
      } else if (mode === 'signup') {
        this.props.signUp(email, password)
      } else if (mode === 'password') {
        this.props.resetPassword(email)
      }
    }
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
    logIn: (email, password) => dispatch(logIn(email, password)),
    signUp: (email, password) => dispatch(signUp(email, password)),
    resetPassword: (email, password) => dispatch(resetPassword(email))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
