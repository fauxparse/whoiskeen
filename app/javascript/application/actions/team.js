import { normalize, arrayOf } from 'normalizr'
import { TeamSchema, MembershipSchema } from '../schemas'
import fetch from '../lib/fetch'
import Team from '../models/team'

export const FETCH_TEAMS = 'FETCH_TEAMS'
export const FETCH_TEAM = 'FETCH_TEAM'
export const REFRESH_TEAMS = 'REFRESH_TEAMS'
export const REFRESH_TEAM = 'REFRESH_TEAM'

export function fetchTeam(team_id) {
  return function(dispatch) {
    fetch(`/teams/${team_id}`)
      .then((response) => response.json())
      .then((json) => {
        const data = normalize(json, TeamSchema)
        dispatch(refreshTeam(data.entities.teams[data.result]))
      })
  }
}

export const fetchTeams = () => function(dispatch) {
  fetch('/teams')
    .then((response) => response.json())
    .then((json) => {
      const data = normalize(json, arrayOf(MembershipSchema))
      const teams = _.values(data.entities.memberships)
        .map(member => _.assign(
          {},
          data.entities.teams[member.team_id],
          { member }
        ))
      dispatch(refreshTeams(_.values(data.entities.teams)))
    })
}

export const refreshTeams = (teams) => ({
  type: REFRESH_TEAMS,
  teams: teams.map((attrs) => new Team(attrs))
})

export const refreshTeam = (team) => ({
  type: REFRESH_TEAM,
  team: new Team(team)
})
