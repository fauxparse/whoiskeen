require('lodash')

import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

const Row = ({ team }) => (
  <li>
    <Link to={team.url()}>{team.name}</Link>
  </li>
)

class TeamList extends React.Component {
  render() {
    const { teams } = this.props

    return (
      <section className="team-list">
        {teams.map((team) => <Row key={team.id} team={team}/>)}
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    teams: _.sortBy(_.values(state.teams), (team) => team.name)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamList)
