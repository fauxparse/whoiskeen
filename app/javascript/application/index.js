import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import thunk from 'redux-thunk'
import Clearance from './components/clearance'
import reducer from './reducers'
import Application from './components/application'

const store = createStore(reducer, applyMiddleware(thunk))
const history = syncHistoryWithStore(browserHistory, store)

document.addEventListener("DOMContentLoaded", e => {
  ReactDOM.render(
    <Provider store={store}>
      <Clearance>
        <Router history={history}>
          <Route path="*" component={Application}/>
        </Router>
      </Clearance>
    </Provider>,
    document.body.appendChild(document.createElement('div'))
  )
})
