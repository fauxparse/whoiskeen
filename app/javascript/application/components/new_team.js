import React from 'react'
import { connect } from 'react-redux'
import TextField from './text_field'
import Team from '../models/team'
import { Buttons } from '../icons'

class NewTeam extends React.Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.state = { name: '' }
  }

  render() {
    const { name } = this.state
    const { close } = this.props

    return (
      <form className="new-team" onSubmit={this.submit}>
        <header>
          <button onClick={close}>{Buttons.CLOSE}</button>
          <h2>{I18n.t('teams.new.title')}</h2>
          <button type="submit">{I18n.t('dialog.save')}</button>
        </header>
        <fieldset>
          <TextField label={I18n.t('activerecord.attributes.team.name')}
            name="name" value={name} autoFocus={true}
            onChange={this.changeName.bind(this)}
          />
        </fieldset>
        <footer>
          <button rel="cancel" onClick={close}>{I18n.t('dialog.cancel')}</button>
          <button type="submit">{I18n.t('teams.new.submit')}</button>
        </footer>
      </form>
    )
  }

  submit(e) {
    e.preventDefault()
  }

  changeName(e) {
    this.setState({ name: e.target.value })
  }
}

const mapStateToProps = (state, ownProps) => {
  return { }
}

const mapDispatchToProps = (dispatch) => {
  return { }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTeam)
