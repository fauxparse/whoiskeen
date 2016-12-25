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

  componentWillReceiveProps(newProps) {
    const { pathname } = newProps.location;

    if (pathname !== this.state.pathname) {
      if (newProps.fetch) newProps.fetch()
      this.setState({
        pathname,
        direction: pathname < (this.state.pathname || '') ?
          PageSlider.RIGHT : PageSlider.LEFT
      });
    }
  }

  render() {
    const { children, location, team } = this.props
    const { direction } = this.state

    return (
      <section className="teams">
        <SectionHeader title={this.title()} direction={direction}/>
        <PageSlider direction={direction}>
          {React.cloneElement(children, {
            key: location.pathname,
            setTitle: (title) => this.setState({ title }),
            team
          })}
        </PageSlider>
      </section>
    )
  }

  title() {
    const { team } = this.props

    return team && team.name || 'Teams'
  }
}

const mapStateToProps = (state, ownProps) => {
  const { teams } = state
  return {
    team: teams.indexed[ownProps.params.team_id]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetch: dispatch(fetchTeams())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Teams)
