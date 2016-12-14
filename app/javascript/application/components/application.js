import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'
import Clearance from './clearance'
import reducer from '../reducers'
import { logOut } from '../actions'

const store = createStore(reducer, applyMiddleware(thunk))

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut())
  }
}

const ApplicationContent = connect(mapStateToProps, mapDispatchToProps)(({ name, logOut }) => (
  <div className="application">
    Bonjour {name}!
    <button onClick={() => logOut()}>Log out</button>
  </div>
))

export default class Application extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Clearance>
          <ApplicationContent name="test" />
        </Clearance>
      </Provider>
    )
  }
}
