import React from 'react'
import ReactDOM from 'react-dom'

export default class Application extends React.Component {
  render() {
    return <div>Bonjour {this.props.name}!</div>
  }
}
