import React from 'react'
import { VelocityComponent } from 'velocity-react'
import { connect } from 'react-redux'
import SectionHeader from './section_header'
import Sidebar from './sidebar'
import { toggleSidebar } from '../actions'

class Application extends React.Component {
  render() {
    const { toggleSidebar, sidebarVisible } = this.props

    return (
      <div className="application">
        <Sidebar/>
        <VelocityComponent {...this.sidebarAnimation()}>
          <main data-sidebar={sidebarVisible}>
            <SectionHeader/>
            <div className="shim" onClick={toggleSidebar}/>
          </main>
        </VelocityComponent>
      </div>
    )
  }

  sidebarAnimation() {
    if (this.props.sidebarVisible) {
      return {
        animation: { translateX: ['18rem', 'spring'] },
        duration: 500
      }
    } else {
      return {
        animation: { translateX: [0, 'easeOutCubic'] },
        duration: 250
      }
    }
  }
}

const mapStateToProps = (state) => {
  return {
    sidebarVisible: state.sidebar
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSidebar: () => dispatch(toggleSidebar())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Application)
