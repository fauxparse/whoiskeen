import React, { Component } from 'react';
import { VelocityTransitionGroup } from 'velocity-react';
import MenuButton from './menu_button';
import PageSlider from './page_slider';

class SectionHeader extends Component {
  render() {
    const { children, direction } = this.props;
    const title = this.props.title || "title";

    return (
      <header className="section-header">
        <MenuButton/>
        <PageSlider component="div" className="title" direction={direction}>
          <h2 key={title}>{title}</h2>
        </PageSlider>
        {children}
      </header>
    )
  }
}

export default SectionHeader;
