import { Schema, arrayOf } from 'normalizr'

export const UserSchema = new Schema('users')
export const MembershipSchema = new Schema('memberships')
export const TeamSchema = new Schema('teams')

UserSchema.define({
  memberships: arrayOf(MembershipSchema)
})

MembershipSchema.define({
  team: TeamSchema
})

TeamSchema.define({
  members: arrayOf(MembershipSchema)
})
