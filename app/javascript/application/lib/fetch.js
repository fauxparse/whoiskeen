require('lodash')

import fetch from 'isomorphic-fetch';

const DEFAULTS = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  credentials: 'same-origin'
}

function mergeOptions(options, defaults = DEFAULTS) {
  return _.defaultsDeep(
    options,
    DEFAULTS,
    { headers: { 'X-CSRF-Token': window.CSRF.token() } }
  )
}

export default (path, options = {}) => fetch(path, mergeOptions(options))
