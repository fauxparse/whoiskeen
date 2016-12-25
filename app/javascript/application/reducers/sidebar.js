import { SIDEBAR } from '../actions'

export default function sidebar(state = false, action) {
  switch (action.type) {
  case SIDEBAR:
    return action.visible === undefined ? !state : action.visible
  default:
    return state
  }
}
