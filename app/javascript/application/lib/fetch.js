import fetch from 'isomorphic-fetch';

const DEFAULTS = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  credentials: 'same-origin'
}

function mergeOptions(options, defaults = DEFAULTS) {
  var headers, token = window.CSRF.token()
  options = Object.assign({}, defaults, options)
  headers = Object.assign({}, defaults.headers, options.headers)
  if (token) headers['X-CSRF-Token'] = token
  return Object.assign(options, { headers })
}

export default (path, options = {}) => fetch(path, mergeOptions(options))
