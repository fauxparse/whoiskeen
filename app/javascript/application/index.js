import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import { Router, Route, IndexRoute, IndexRedirect, browserHistory }
  from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import Clearance from './components/clearance'
import reducer from './reducers'
import Dashboard from './components/dashboard'
import Teams from './components/teams'
import NewTeam from './components/new_team'
import TeamList from './components/team_list'
import Team from './components/team'
import Inbox from './components/inbox'
import Events from './components/events'
import People from './components/people'
import MemberList from './components/member_list'
import MemberDetails from './components/member_details'
import NewMember from './components/new_member'
import Stats from './components/stats'
import AcceptInvitation from './components/accept_invitation'

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
          <IndexRedirect to="teams"/>
          <Route path="teams" component={Teams}>
            <IndexRoute components={{main: TeamList, modal: NewTeam}}/>
            <Route path=":team_id" components={{main: Team}}>
              <Route path="inbox" components={{main: Inbox, modal: NewTeam}}/>
              <Route path="events" components={{main: Events, modal: NewTeam}}/>
              <Route path="people" components={{main: People, modal: NewMember}}>
                <IndexRoute components={{main: MemberList}}/>
                <Route path=":member_id" components={{main: MemberDetails}}/>
              </Route>
              <Route path="stats" components={{main: Stats, modal: NewTeam}}/>
              <IndexRedirect to="inbox"/>
            </Route>
          </Route>
          <Route path="invitations/:code" component={AcceptInvitation}/>
        </Route>
      </Router>
    </Provider>,
    document.body.appendChild(document.createElement('div'))
  )
})
