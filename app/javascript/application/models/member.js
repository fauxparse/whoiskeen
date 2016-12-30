import Model from './model';

export default class Member extends Model {
  url() {
    return `/teams/${this.team.slug}/people/${this.slug}`
  }
}
