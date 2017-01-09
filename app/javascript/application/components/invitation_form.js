import React from 'react'
import classNames from '../lib/class_names'
import fetch from '../lib/fetch'
import { Buttons } from '../icons'

export default class InvitationForm extends React.Component {
  constructor(props) {
    super(props)
    const invitation = props.member.invitation
    this.state = {
      open: false,
      sending: false,
      email: invitation && invitation.email || '',
      invitation
    }
  }

  render() {
    const { open, invitation, email, sending } = this.state
    const { member } = this.props
    const disabled = !!invitation || sending
    const sent = invitation && invitation.code

    return (
      <form className={classNames('invitation-form', open && 'open')}
        onSubmit={this.submit.bind(this)}>
        <button type="button" rel="toggle" onClick={this.toggle.bind(this)}>
          {sent ? Buttons.INVITING : Buttons.INVITE}
        </button>
        {this.email()}
        {this.sendButton()}
      </form>
    )
  }

  email() {
    const { invitation, email, sending } = this.state
    const disabled = !!invitation || sending
    const sent = invitation && invitation.code

    if (sent) {
      return (
        <div ref={() => this.input = undefined} title={email}>{email}</div>
      )
    } else {
      return (
        <input type="email" name="email"
          ref={(input) => { this.input = input }}
          disabled={disabled}
          value={email}
          onChange={(e) => this.setState({ email: e.target.value })}
          placeholder={I18n.t('activerecord.attributes.invitation.email')}/>
      )
    }
  }

  sendButton() {
    const { invitation, sending, email } = this.state
    if (invitation) {
      return (
        <button type="button" rel="cancel" onClick={this.cancel.bind(this)}>
          {I18n.t('invitations.new.uninvite')}
        </button>
      )
    } else {
      return (
        <button type="submit" disabled={sending || !email}>
          {I18n.t(`invitations.new.${sending ? 'sending' : 'send'}`)}
        </button>
      )
    }
  }

  toggle() {
    const open = !this.state.open
    if (open && this.input) {
      setTimeout(
        () => this.input.focus(),
        500
      )
    }
    this.setState({ open })
  }

  submit(e) {
    e.preventDefault()

    const { member, admin } = this.props
    const { email } = this.state

    this.setState({ sending: true })

    fetch('/invitations', {
      method: 'post',
      body: {
        invitation: {
          memberId: member.id,
          senderId: admin.id,
          email
        }
      }
    })
      .then((response) => response.json())
      .then((invitation) => {
        this.setState({
          invitation,
          sending: false,
          open: !_.isEmpty(invitation.errors)
        })
      })
  }

  cancel() {
    const { invitation } = this.state

    this.setState({ sending: true })

    fetch(`/invitations/${invitation.code}`, { method: 'delete' })
      .then((response) => response.json())
      .then((invitation) => {
        this.setState({ sending: false })
        if (invitation.status == 'cancelled') {
          this.setState({ open: false, invitation: undefined, email: '' })
        }
      })
  }
}
