/**
 * Defines the Attribute storage class that is used by each Model.
 * Allows for dirty checking.
 */
class Attribute {

  constructor(value){
    this._value = value;
    this._isDirty = false;
  }

  get value() {
    return this._value;
  }

  set value(value){
    if(value !== this.value){
      this._isDirty = true;
      this._value = value;
    }
  }
}

module.exports = Attribute;