import Model from './model';
import Member from './member';

export default class Team extends Model {
  url() {
    return `/teams/${this.slug}`
  }

  set members(data) {
    const team = this

    this._members = _.reduce(
      data,
      (hash, attrs) => _.assign(hash, { [attrs.slug]: new Member(_.assign({}, { team }, attrs)) }),
      {}
    )
  }

  get members() {
    return _.values(this._members || {})
  }

  refreshMember(member) {
    this._members[member.slug] = member
  }
}
