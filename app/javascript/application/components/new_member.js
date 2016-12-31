import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetch from '../lib/fetch'
import { refreshMember } from '../actions'
import TextField from './text_field'
import Member from '../models/member'
import { Buttons } from '../icons'

class NewMember extends React.Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.state = {
      name: '',
      saving: false,
      errors: {}
    }
  }

  render() {
    const { name, saving, errors } = this.state
    const { close } = this.props

    return (
      <form className="new-member" onSubmit={this.submit}>
        <header>
          <button type="button" onClick={close} disabled={saving}>
            {Buttons.CLOSE}
          </button>
          <h2>{I18n.t('members.new.title')}</h2>
          <button type="submit" disabled={saving || !name}>
            {I18n.t(saving ? 'dialog.saving' : 'members.new.submit')}
          </button>
        </header>
        <fieldset disabled={saving}>
          <TextField label={I18n.t('activerecord.attributes.member.name')}
            name="name" value={name} autoFocus={true}
            errors={errors.name || []}
            onChange={this.changeName.bind(this)}
          />
        </fieldset>
        <footer>
          <button type="button" rel="cancel" onClick={close} disabled={saving}>
            {I18n.t('dialog.cancel')}
          </button>
          <button type="submit" disabled={saving || !name}>
            {I18n.t(saving ? 'dialog.saving' : 'members.new.submit')}
          </button>
        </footer>
      </form>
    )
  }

  submit(e) {
    const { team } = this.props
    const { name, displayName } = this.state
    e.preventDefault()
    e.stopPropagation()

    if (name) {
      this.setState({ saving: true })
      fetch(`/teams/${team.slug}/people.json`, {
        method: 'post',
        body: JSON.stringify({
          member: { name }
        })
      })
        .then((response) => response.json())
        .then((json) => this.created(new Member(json)))
    }
  }

  created(member) {
    const { name, errors } = member

    this.setState({ saving: false, name, errors })

    if (_.isEmpty(errors)) {
      this.props.addMember(this.props.team, member)
      this.props.close()
      setTimeout(() => this.props.goToMemberPage(member), 500)
    }
  }

  changeName(e) {
    this.setState({ name: e.target.value })
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    team: state.teams.indexed[ownProps.params.team_id]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addMember: (team, member) => dispatch(refreshMember(team, member)),
    goToMemberPage: (member) => dispatch(push(member.url()))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMember)
