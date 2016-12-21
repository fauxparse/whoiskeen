import fetch from '../lib/fetch'
import Team from '../models/team'

export const FETCH_TEAMS = 'FETCH_TEAMS'
export const REFRESH_TEAMS = 'REFRESH_TEAMS'

export function fetchTeams(teams) {
  return function(dispatch) {
    fetch('/teams')
      .then((response) => response.json())
      .then((teams) => dispatch(refreshTeams(teams)))
  }
}

export function refreshTeams(teams) {
  return {
    type: REFRESH_TEAMS,
    teams: teams.map((attrs) => new Team(attrs))
  }
}
