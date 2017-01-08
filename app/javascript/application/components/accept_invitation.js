import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { refreshTeam, refreshMember } from '../actions'
import fetch from '../lib/fetch'

class AcceptInvitation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.fetch().then(invitation => this.setState({ invitation: invitation }))
  }

  render() {
    const { invitation } = this.state
    if (invitation) {
      const { sender, team } = invitation
      return (
        <section className="accept-invitation">
          <p>
            {I18n.t('invitations.show.invitation',
              { sender: sender.name, team: team.name }
            )}
          </p>
          <footer>
            <button className="flat" rel="decline"
              onClick={this.decline.bind(this)}>
              {I18n.t('invitations.show.decline')}
            </button>
            <button className="raised primary" rel="accept"
              onClick={this.accept.bind(this)}>
              {I18n.t('invitations.show.accept')}
            </button>
          </footer>
        </section>
      )
    } else {
      return (
        <section className="accept-invitation"/>
      )
    }
  }

  accept() {
    this.fetch('accept', 'post').then((invitation) => this.accepted(invitation))
  }

  accepted(invitation) {
    this.props.refreshTeam(invitation.team, invitation.member)
    this.props.go(`/teams/${invitation.team.slug}`)
  }

  decline() {
    this.fetch('decline', 'post').then(() => this.props.go('/'))
  }

  fetch(verb = '', method = 'get') {
    const { params } = this.props
    var url = `/invitations/${params.code}`
    if (verb) url += '/' + verb
    return fetch(url, { method: method })
      .then(response => response.json())
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    teams: state.teams
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    go: (url) => dispatch(push(url)),
    refreshTeam: (team) => dispatch(refreshTeam(team)),
    refreshMember: (team, member) => dispatch(refreshMember(team, member))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AcceptInvitation)
