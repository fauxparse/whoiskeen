import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { VelocityTransitionGroup } from 'velocity-react'
import { fetchTeam, fetchTeams } from '../actions'
import FloatingActionButton from './floating_action_button'
import PageSlider from './page_slider'
import Animations from '../animations'
import { Buttons, Tabs } from '../icons'

const TeamTab = ({ team, name }) => (
  <Link to={team.url() + '/' + name} data-tab={name} role="tab"
    activeClassName="active">
    {Tabs[name]}
    <span>{I18n.t(`teams.${name}.title`)}</span>
  </Link>
)

class Team extends React.Component {
  componentWillReceiveProps(newProps) {
    const { team, modal } = newProps
    if (!team.members && newProps.refresh && !newProps.loading) {
      newProps.refresh(team.slug)
    }
  }

  render() {
    const { team, loading, modal } = this.props

    return (
      <section className="team">
        <PageSlider>
        </PageSlider>
        <VelocityTransitionGroup component="footer" role="tablist"
          enter={{
            animation: Animations.Tabs.In,
            style: { translateY: '5rem' },
            delay: 250,
            stagger: 50,
            duration: 250
          }}
          runOnMount={true}>
          {this.tabs()}
        </VelocityTransitionGroup>
        <FloatingActionButton rel="add" modal={modal} icon={Buttons.ADD}
          location={location}/>
      </section>
    )
  }

  tabs() {
    const { team } = this.props
    if (team) {
      return Team.TABS.map(tab => <TeamTab key={tab} name={tab} team={team}/>)
    }
  }
}

Team.TABS = ['inbox', 'events', 'people', 'stats']

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.teams.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    refresh: (id) => dispatch(fetchTeam(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Team)
