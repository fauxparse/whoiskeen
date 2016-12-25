import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import Clearance from './components/clearance'
import reducer from './reducers'
import Dashboard from './components/dashboard'
import Teams from './components/teams'
import NewTeam from './components/new_team'
import TeamList from './components/team_list'
import TeamContainer from './components/team_container'

const store = createStore(
  reducer,
  applyMiddleware(thunk),
  applyMiddleware(routerMiddleware(browserHistory))
)
const history = syncHistoryWithStore(browserHistory, store)

document.addEventListener("DOMContentLoaded", e => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Clearance}>
          <IndexRoute component={Dashboard}/>
          <Route path="teams" component={Teams}>
            <IndexRoute component={TeamList}/>
            <Route path=":team_id" component={TeamContainer}/>
          </Route>
        </Route>
      </Router>
    </Provider>,
    document.body.appendChild(document.createElement('div'))
  )
})
