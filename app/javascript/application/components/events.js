import React from 'react'
import { connect } from 'react-redux'

class Events extends React.Component {
  render() {
    return (
      <section className="events">
        <h1>Events</h1>
      </section>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)
