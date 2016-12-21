require('lodash')

import { REFRESH_TEAMS } from '../actions'

const indexById = (accumulator, value) => {
  accumulator[value.id] = value
  return accumulator
}

export default function teams(state = {}, action) {
  switch (action.type) {
  case REFRESH_TEAMS:
    return _.reduce(action.teams, indexById, {})
  default:
    return state
  }
}

