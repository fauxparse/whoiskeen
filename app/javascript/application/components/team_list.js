require('lodash')

import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

const Row = ({ team }) => (
  <li><Link to={team.url()}><span>{team.name}</span></Link></li>
)

class TeamList extends React.Component {
  componentDidMount() {
    this.props.setTitle('Teams')
  }

  render() {
    const { teams } = this.props

    return (
      <section className="team-list">
        <ul>
          {teams.map((team) => <Row key={team.id} team={team}/>)}
        </ul>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    teams: state.teams.entities
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamList)
