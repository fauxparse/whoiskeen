require('lodash')

import {
  FETCH_TEAM, FETCH_TEAMS, REFRESH_TEAM, REFRESH_TEAMS, REFRESH_TEAM_MEMBER
} from '../actions'

const DEFAULT_STATE = {
  loading: false,
  entities: [],
  indexed: {}
}

const index = (accumulator, value) => {
  accumulator[value.slug] = value
  return accumulator
}

function refresh(state, teams, clear = false) {
  var records = _.reduce(teams, index, clear ? {} : state.indexed)
  return {
    entities: _.sortBy(_.values(records), record => record.name),
    indexed: records,
    loading: false
  }
}

export default function teams(state = DEFAULT_STATE, action) {
  switch (action.type) {
  case REFRESH_TEAMS:
    return refresh(state, action.teams, !!action.clear)
  case REFRESH_TEAM:
    if (action.member) action.team.refreshMember(action.member)
    return refresh(state, [action.team])
  case FETCH_TEAMS:
  case FETCH_TEAM:
    return _.assign({}, state, { loading: true })
  case REFRESH_TEAM_MEMBER:
    action.team.refreshMember(action.member)
    return refresh(state, [action.team])
  default:
    return state
  }
}

