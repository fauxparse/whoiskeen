import React from 'react'
import { connect } from 'react-redux'
import { fetchTeams } from '../actions'

class TeamContainer extends React.Component {
  componentWillMount() {
    fetchTeams()
  }

  render() {
    const { teams } = this.props

    return (
      <section className="team">
        Teeeeeam
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    teams: state.teams
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamContainer)
