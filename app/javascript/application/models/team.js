import Model from './model';

export default class Team extends Model {
  url() {
    return `/teams/${this.id}`
  }
}
