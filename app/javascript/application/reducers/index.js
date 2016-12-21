import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import sidebar from './sidebar'
import teams from './teams'
import user from './user'

const reducer = combineReducers({
  sidebar,
  teams,
  user,
  routing: routerReducer
})

export default reducer
