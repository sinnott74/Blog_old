/**
 * Defines the Attribute storage class that is used by each Model.
 * Allows for dirty checking.
 */
class Attribute {
  constructor(name, value) {
    this.name = name;
    this.value = value;
    this.isDirty = true;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    if (value !== this.value) {
      this.isDirty = true;
      this._value = value;
    }
  }
}

module.exports = Attribute;
