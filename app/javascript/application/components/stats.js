import React from 'react'
import { connect } from 'react-redux'

class Stats extends React.Component {
  render() {
    return (
      <section className="stats">
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

export default connect(mapStateToProps, mapDispatchToProps)(Stats)
