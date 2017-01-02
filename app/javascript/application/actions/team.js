import { normalize, arrayOf } from 'normalizr'
import { TeamSchema, MembershipSchema } from '../schemas'
import fetch from '../lib/fetch'
import Team from '../models/team'
import Member from '../models/member'

export const FETCH_TEAMS = 'FETCH_TEAMS'
export const FETCH_TEAM = 'FETCH_TEAM'
export const REFRESH_TEAMS = 'REFRESH_TEAMS'
export const REFRESH_TEAM = 'REFRESH_TEAM'
export const REFRESH_TEAM_MEMBER = 'REFRESH_TEAM_MEMBER'

export function fetchTeam(team_id) {
  return function(dispatch) {
    fetch(`/teams/${team_id}.json`)
      .then((response) => response.json())
      .then((json) => {
        const data = normalize(json, TeamSchema)
        const members = _.values(data.entities.memberships)
        const team = _.assign(
          {},
          data.entities.teams[data.result],
          { members }
        )
        dispatch(refreshTeam(team))
      })
  }
}

export const fetchTeams = () => function(dispatch) {
  fetch('/teams.json')
    .then((response) => response.json())
    .then((json) => {
      const data = normalize(json, arrayOf(MembershipSchema))
      const teams = _.values(data.entities.memberships)
        .map(member => _.assign(
          {},
          _.omit(data.entities.teams[member.team], ['members']),
          { member }
        ))
      dispatch(refreshTeams(teams))
    })
}

export const refreshTeams = (teams, clear = true) => ({
  type: REFRESH_TEAMS,
  teams: teams.map((attrs) => new Team(attrs)),
  clear
})

export const refreshTeam = (attrs) => ({
  type: REFRESH_TEAM,
  team: new Team(attrs)
})

export const refreshMember = (team, member) => ({
  type: REFRESH_TEAM_MEMBER,
  team,
  member
})
