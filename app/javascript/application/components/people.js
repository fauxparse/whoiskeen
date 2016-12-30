import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import PageSlider from './page_slider'

class People extends React.Component {
  render() {
    const { team, main, location } = this.props
    const members = _.sortBy(team.members, member => member.name)

    const pathname = _.last([location.pathname, team.url() + '/people'].sort())

    return (
      <section className="people">
        <PageSlider>
          {React.cloneElement(main, { key: pathname.split('/').slice(0, 5).join('/'), team })}
        </PageSlider>
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

export default connect(mapStateToProps, mapDispatchToProps)(People)
