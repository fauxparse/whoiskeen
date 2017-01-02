import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class MemberDetails extends React.Component {
  render() {
    const { team, member } = this.props

    return (
      <section className="member-details">
        {member && member.name}
      </section>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    member: _.find(
      ownProps.team.members,
      member => member.slug === ownProps.routeParams.member_id
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberDetails)
