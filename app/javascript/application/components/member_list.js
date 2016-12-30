import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

const Member = ({ member }) => (
  <li>
    <Link to={member.url()}>
      <span>{member.name}</span>
    </Link>
  </li>
)

class MemberList extends React.Component {
  render() {
    const { team } = this.props
    const members = _.sortBy(team.members, member => member.name)

    return (
      <section className="member-list">
        <ul className="members">
          {members.map(member => <Member key={member.id} member={member}/>)}
        </ul>
      </section>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberList)
