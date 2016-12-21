import React from 'react'
import { connect } from 'react-redux'
import SectionHeader from './section_header'

class Dashboard extends React.Component {
  render() {
    return (
      <section className="dashboard">
        <SectionHeader title=""/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
