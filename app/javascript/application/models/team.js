import Model from './model';
import Member from './member';

export default class Team extends Model {
  url() {
    return `/teams/${this.slug}`
  }

  set members(data) {
    const team = this
    this._members = data.map(attrs => new Member(_.assign({}, { team }, attrs)))
  }

  get members() {
    return this._members || []
  }
}
