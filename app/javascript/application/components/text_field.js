import React from 'react'
import classNames from '../lib/class_names'

export default class TextField extends React.Component {
  constructor(props) {
    super(props)
    this.state = { focus: false, hasValue: !this.emptyValue(props.value) }
  }

  render() {
    const { name, id, value, label, type } = this.props;

    return (
      <div className={this.fieldClass()} data-name={name}>
        <input type={type || 'text'} name={name} value={value} id={id || name}
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.handleBlur.bind(this)}
          onChange={this.handleChange.bind(this)}
          {...this.extraProps()}
        />
        <label htmlFor={id || name}>{label}</label>
        {this.errors()}
      </div>
    )
  }

  fieldClass() {
    return classNames(
      this.props.className,
      'field',
      'floating-label',
      this.state.hasValue && 'has-value',
      this.state.focus && 'has-focus',
      this.errors().length && 'has-errors'
    )
  }

  errors() {
    return (this.props.errors || []).map((message, i) => (
      <p key={i} className="error">{message}</p>
    ))
  }

  extraProps() {
    return _.omit(this.props, [
      'name', 'id', 'value', 'label', 'type', 'errors',
      'onChange', 'onFocus', 'onBlur'
    ])
  }

  handleChange(e) {
    this.setState({ hasValue: !this.emptyValue(e.target.value) })
    if (this.props.onChange) this.props.onChange(e)
  }

  handleFocus(e) {
    this.setState({ focus: true })
    if (this.props.onFocus) this.props.onFocus(e)
  }

  handleBlur(e) {
    this.setState({ focus: false })
    if (this.props.onBlur) this.props.onBlur(e)
  }

  emptyValue(value) {
    return (value === undefined) || (value === '')
  }
}
