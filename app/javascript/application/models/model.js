export default class Model {
  constructor(attributes = {}) {
    this.setAttributes(attributes)
  }

  get key() {
    return `${this.constructor.name}#${this.id}`;
  }

  toJSON() {
    var json = {};
    if (this.id) {
      this.json.id = this.id;
    }
    return json;
  }

  setAttributes(attributes) {
    for (var attr in attributes) if (attributes.hasOwnProperty(attr)) {
      this[attr] = attributes[attr];
    }
  }
}
