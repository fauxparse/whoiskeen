import fetch from '../lib/fetch'
import User from '../models/user'

export const LOG_IN = 'LOG_IN'
export const LOGGED_IN = 'LOGGED_IN'

export function getLoggedInUser() {
  return function(dispatch) {
    fetch('/session')
      .then((response) => response.json())
      .then((user) => dispatch(loggedIn(new User(user))))
  }
}

export function logIn(email, password) {
  return function(dispatch) {
    fetch('/session', {
      method: 'post',
      body: JSON.stringify({
        session: { email, password }
      })
    })
    .then((response) => response.json())
    .then((user) => dispatch(loggedIn(new User(user))))
  }
}

export function logOut() {
  return function(dispatch) {
    fetch('/sign_out', { method: 'DELETE' })
      .then(() => dispatch(loggedIn(new User())))
  }
}

export function loggedIn(user) {
  return { type: LOGGED_IN, user }
}
