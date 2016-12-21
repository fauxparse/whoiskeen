import React from 'react'
import { connect } from 'react-redux'
import SectionHeader from './section_header'
import PageSlider from './page_slider'
import { fetchTeams } from '../actions'

class Teams extends React.Component {
  constructor(props) {
    super(props)
    this.state = { direction: PageSlider.LEFT }
  }

  componentWillMount() {
    fetchTeams()
  }

  componentWillReceiveProps(newProps) {
    const { pathname } = newProps.location;

    if (pathname !== this.state.pathname) {
      this.setState({
        pathname,
        direction: pathname < (this.state.pathname || '') ?
          PageSlider.RIGHT : PageSlider.LEFT
      });
    }
  }

  render() {
    const { children, location } = this.props
    const { direction } = this.state

    return (
      <section className="teams">
        <SectionHeader title={this.title()} direction={direction}/>
        <PageSlider direction={direction}>
          {React.cloneElement(children, { key: location.pathname })}
        </PageSlider>
      </section>
    )
  }

  title() {
    const team = this.team() || {}

    return team.name || 'Teams'
  }

  team() {
    const { teams, params } = this.props

    return teams[params.team_id]
  }
}

const mapStateToProps = (state) => {
  return {
    teams: state.teams || {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetch: dispatch(fetchTeams())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Teams)
