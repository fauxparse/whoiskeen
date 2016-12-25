import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetch from '../lib/fetch'
import TextField from './text_field'
import Team from '../models/team'
import { Buttons } from '../icons'
import { refreshTeam } from '../actions'

class NewTeam extends React.Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.state = { name: '', displayName: '', saving: false, errors: {} }
  }

  render() {
    const { name, displayName, saving, errors } = this.state
    const { close } = this.props

    return (
      <form className="new-team" onSubmit={this.submit}>
        <header>
          <button type="button" onClick={close} disabled={saving}>
            {Buttons.CLOSE}
          </button>
          <h2>{I18n.t('teams.new.title')}</h2>
          <button type="submit" disabled={saving || !name || !displayName}>
            {I18n.t(saving ? 'dialog.saving' : 'dialog.save')}
          </button>
        </header>
        <fieldset disabled={saving}>
          <TextField label={I18n.t('activerecord.attributes.team.name')}
            name="name" value={name} autoFocus={true}
            errors={errors.name || []}
            onChange={this.changeName.bind(this)}
          />
          <TextField
            label={I18n.t('activerecord.attributes.team.display_name')}
            name="display_name" value={displayName}
            errors={errors['members.name'] || []}
            onChange={this.changeDisplayName.bind(this)}
          />
        </fieldset>
        <footer>
          <button type="button" rel="cancel" onClick={close} disabled={saving}>
            {I18n.t('dialog.cancel')}
          </button>
          <button type="submit" disabled={saving || !name || !displayName}>
            {I18n.t(saving ? 'dialog.saving' : 'teams.new.submit')}
          </button>
        </footer>
      </form>
    )
  }

  submit(e) {
    const { name, displayName } = this.state
    e.preventDefault()
    e.stopPropagation()

    if (name, displayName) {
      this.setState({ saving: true })
      fetch('/teams.json', {
        method: 'post',
        body: JSON.stringify({
          team: { name, displayName }
        })
      })
        .then((response) => response.json())
        .then((json) => this.created(new Team(json)))
    }
  }

  created(team) {
    const { name, errors } = team

    this.setState({ saving: false, name, errors })

    if (_.isEmpty(errors)) {
      this.props.addTeam(team)
      this.props.close()
      setTimeout(() => this.props.goToTeamPage(team), 500)
    }
  }

  changeName(e) {
    this.setState({ name: e.target.value })
  }

  changeDisplayName(e) {
    this.setState({ displayName: e.target.value })
  }
}

const mapStateToProps = (state, ownProps) => {
  return { }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTeam: (team) => dispatch(refreshTeam(team)),
    goToTeamPage: (team) => dispatch(push(team.url()))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTeam)
