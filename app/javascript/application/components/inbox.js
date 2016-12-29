import React from 'react'
import { connect } from 'react-redux'

class Inbox extends React.Component {
  render() {
    return (
      <section className="inbox">
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

export default connect(mapStateToProps, mapDispatchToProps)(Inbox)
