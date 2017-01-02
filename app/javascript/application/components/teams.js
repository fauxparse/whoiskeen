import React from 'react'
import { connect } from 'react-redux'
import { VelocityTransitionGroup } from 'velocity-react'
import SectionHeader from './section_header'
import PageSlider from './page_slider'
import NewTeam from './new_team'
import FloatingActionButton from './floating_action_button'
import { Buttons } from '../icons'
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
    const { main, modal, location, team } = this.props
    const { direction } = this.state

    return (
      <section className="teams">
        <SectionHeader title={this.title()} direction={direction}/>
        <PageSlider direction={direction}>
          {React.cloneElement(main, {
            key: location.pathname.split('/').slice(0, 3).join('/'),
            setTitle: (title) => this.setState({ title }),
            team
          })}
        </PageSlider>
        <FloatingActionButton rel="add" modal={modal} icon={Buttons.ADD}
          location={location}/>
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
