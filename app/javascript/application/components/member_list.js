import React from 'react'
import { Link } from 'react-router'
import { VelocityTransitionGroup } from 'velocity-react'
import { connect } from 'react-redux'
import classNames from '../lib/class_names'
import { Buttons } from '../icons'
import StaggeredList from './staggered_list'
import Avatar from './avatar'
import InvitationForm from './invitation_form'

class Member extends React.Component {
  render() {
    const { member, admin } = this.props
    const invitable = admin && !member.userId

    return (
      <li data-member-id={member.id}>
        {invitable && <InvitationForm member={member} admin={admin}/>}
        <Link to={member.url()}>
          <Avatar owner={member}
            className={[
              'member-avatar',
              member.email && 'verified',
              member.admin && 'admin'
            ]}/>
          <span className="name">
            <b>{member.name}</b>
            {member.admin && <small>{member.label('admin')}</small>}
          </span>
        </Link>
      </li>
    )
  }
}

class MemberList extends React.Component {
  render() {
    const { team, admin } = this.props
    const members = _.sortBy(team.members, member => member.name)

    return (
      <section className="member-list">
        <StaggeredList className="members">
          {members.map(
            member => <Member key={member.id} member={member} admin={admin}/>
          )}
        </StaggeredList>
      </section>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    admin: _.find(
      ownProps.team.members,
      member => member.userId === state.user.id && member.admin
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberList)
