export default class Model {
  constructor(attributes = {}) {
    this.setAttributes(attributes)
  }

  get key() {
    return `${this.constructor.name}#${this.id}`;
  }

  set errors(errors) {
    this._errors = errors
  }

  get errors() {
    return this._errors || {}
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

  label(attribute) {
    return I18n.t(`activerecord.attributes.${this.modelName()}.${attribute}`)
  }

  modelName() {
    return _.snakeCase(this.constructor.name)
  }
}
