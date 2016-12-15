require('lodash')

import React from 'react'

export default class TextField extends React.Component {
  constructor(props) {
    super(props)
    this.state = { focus: false, hasValue: !this.emptyValue(props.value) }
  }

  render() {
    const { name, value, label, type } = this.props;

    return (
      <div className={this.fieldClass()}>
        <label htmlFor={name}>{label}</label>
        <input type={type || 'text'} name={name} value={value}
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.handleBlur.bind(this)}
          onChange={this.handleChange.bind(this)}
          {...this.extraProps()}
        />
        {this.errors().map((message) => <p className="error">{message}</p>)}
      </div>
    )
  }

  fieldClass() {
    let classNames = _.filter((this.props.className || '').split(/\s+/))
    classNames.push('field')
    if (this.state.hasValue) classNames.push('has-value')
    if (this.state.focus) classNames.push('has-focus')
    if (this.errors().length) classNames.push('has-errors')
    return _.uniq(classNames).join(' ')
  }

  errors() {
    return this.props.errors || []
  }

  extraProps() {
    return _.omit(this.props, [
      'name', 'value', 'label', 'type', 'errors',
      'onChange', 'onFocus', 'onBlur'
    ])
  }

  handleChange(e) {
    this.setState({ hasValue: !this.emptyValue(e.target.value) })
    this.props.onChange && this.props.onChange(e)
  }

  handleFocus(e) {
    this.setState({ focus: true })
    this.props.onFocus && this.props.onFocus(e)
  }

  handleBlur(e) {
    this.setState({ focus: false })
    this.props.onBlur && this.props.onBlur(e)
  }

  emptyValue(value) {
    return (value === undefined) || (value === '')
  }
}