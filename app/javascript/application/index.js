import React from 'react'
import ReactDOM from 'react-dom'
import Application from './components/application'

document.addEventListener("DOMContentLoaded", e => {
  ReactDOM.render(
    <Application name="React" />,
    document.body.appendChild(document.createElement('div'))
  )
})
