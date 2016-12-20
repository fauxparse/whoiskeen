import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import user from './user'
import sidebar from './sidebar'

const reducer = combineReducers({
  user,
  sidebar,
  routing: routerReducer
})

export default reducer
