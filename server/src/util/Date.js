var moment = require('moment');
let defaultFormat = "ddd, Do MMM YYYY"; // Fri, 12th Jan 2017

class Date {

  constructor(input) {
    this.internalDate = moment(input);
  }

  format(dateFormat) {
    return this.internalDate.format(dateFormat);
  }

  toString() {
    return this.internalDate.format(defaultFormat);
  }

  toISOString() {
    return this.internalDate.toISOString();
  }
}

module.exports = Date;