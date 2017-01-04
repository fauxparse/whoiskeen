import React from 'react'
import classNames from '../lib/class_names'
import { Buttons } from '../icons'

export default class Checkbox extends React.Component {
  render() {
    const { name, id, value, checked, label, type } = this.props;

    return (
      <div className={this.fieldClass()} data-name={name}>
        <label>
          <input type="checkbox" name={name} value={value} checked={checked}
            onChange={this.handleChange.bind(this)}
            {...this.extraProps()}
          />
          {Buttons.CHECKBOX}
          <span>{label}</span>
        </label>
        {this.errors()}
      </div>
    )
  }

  fieldClass() {
    return classNames(
      this.props.className,
      'field',
      'checkbox',
      this.props.checked && 'checked'
    )
  }

  errors() {
    return (this.props.errors || []).map((message, i) => (
      <p key={i} className="error">{message}</p>
    ))
  }

  extraProps() {
    return _.omit(this.props, [
      'name', 'value', 'label', 'checked', 'errors', 'onChange'
    ])
  }

  handleChange(e) {
    if (this.props.onChange) this.props.onChange(e)
  }
}
