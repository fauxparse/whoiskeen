import React from 'react'
import { connect } from 'react-redux'
import fetch from '../lib/fetch'
import { logIn } from '../actions'
import User from '../models/user'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { mode: 'login', email: '', password: '' }
  }

  componentWillReceiveProps(newProps) {
    const { email } = newProps.user || new User;
    this.setState({ email: (email || '').substr(0) })
  }

  render() {
    return (
      <div className="login-form">
        <h1>Who’s keen?</h1>
        {this.contents()}
      </div>
    )
  }

  contents() {
    switch (this.state.mode) {
    case 'login':
      return this.loginForm()
    }
  }

  loginForm() {
    const { email } = this.state

    return (
      <form action="/session" method="post" onSubmit={this.submit.bind(this)}>
        <div className="field">
          <label htmlFor="session_email">Email address</label>
          <input type="text" id="session_email" name="session[email]"
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })} />
        </div>
        <div className="field">
          <label htmlFor="session_email">Password</label>
          <input type="password" id="session_password" name="session[password]"
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })} />
        </div>
        <button type="submit">Log in</button>
      </form>
    )
  }

  submit(e) {
    const { email, password } = this.state;
    e.preventDefault();
    this.props.logIn(email, password);
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
