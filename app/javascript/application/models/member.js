import Model from './model';

export default class Member extends Model {
  toString() {
    return this.name
  }

  url() {
    return `/teams/${this.team.slug}/people/${this.slug}`
  }
}
