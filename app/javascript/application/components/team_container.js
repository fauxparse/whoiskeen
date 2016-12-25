import React from 'react'
import { connect } from 'react-redux'
import { fetchTeam, fetchTeams } from '../actions'

class TeamContainer extends React.Component {
  componentWillReceiveProps(newProps) {
    if (!newProps.team.members && newProps.refresh && !newProps.loading) {
      newProps.refresh(newProps.team.slug)
    }
  }

  render() {
    const { team } = this.props

    return (
      <section className="team">
        {team && team.name}
      </section>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.teams.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    refresh: (id) => dispatch(fetchTeam(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamContainer)
