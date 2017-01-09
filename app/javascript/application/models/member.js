import React from 'react'
import Model from './model';

export default class Member extends Model {
  toString() {
    return this.name
  }

  url() {
    return `/teams/${this.team.slug}/people/${this.slug}`
  }

  set invitations(values) {
    this._invitations = (values || [])
  }

  get invitations() {
    return this._invitations || []
  }

  set invitation(value) {
    this._invitations = value ? [value] : []
  }

  get invitation() {
    return this.invitations[0]
  }
}
