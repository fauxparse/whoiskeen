import React from 'react'
import classNames from '../lib/class_names'

const COLORS = [
  'red',
  'pink',
  'grape',
  'violet',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'green',
  'lime',
  'yellow',
  'orange'
]

const hash = (str) =>
  _.reduce(str.split(''), (h, c) => (h = (h << 5) - h + c.charCodeAt(0)) & h, 0)

class Avatar extends React.Component {
  render() {
    const initial = this.props.owner.toString().substr(0, 1)
    return (
      <span className={this.classNames()}>
        {this.image()}
        <span className="initial">{initial}</span>
      </span>
    )
  }

  image() {
    const { owner } = this.props
    if (owner.avatar) {
      return <img src={owner.avatar} alt={owner.name}/>
    }
  }

  classNames() {
    return classNames(
      'avatar',
      this.props.owner.avatar && 'has-image',
      this.props.className,
      this.color()
    )
  }

  color() {
    const { owner } = this.props
    return COLORS[Math.abs(hash(owner.toString())) % COLORS.length]
  }
}

export default Avatar
