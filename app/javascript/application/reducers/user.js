import { LOGGED_IN } from '../actions'
import User from '../models/user'

export default function user(state = false, action) {
  switch (action.type) {
  case LOGGED_IN:
    return action.user
  default:
    return state
  }
}
