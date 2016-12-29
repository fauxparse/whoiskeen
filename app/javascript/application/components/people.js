import React from 'react'
import { connect } from 'react-redux'

class People extends React.Component {
  render() {
    return (
      <section className="people">
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

export default connect(mapStateToProps, mapDispatchToProps)(People)
