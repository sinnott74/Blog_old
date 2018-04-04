import * as moment from "moment";
let defaultFormat = "ddd, Do MMM YYYY"; // Fri, 12th Jan 2017

export default class WrappedDate {
  internalDate: moment.Moment;

  constructor(input: Date) {
    this.internalDate = moment.default(input);
  }

  format(dateFormat: string) {
    return this.internalDate.format(dateFormat);
  }

  toString() {
    return this.internalDate.format(defaultFormat);
  }

  toISOString() {
    return this.internalDate.toISOString();
  }
}
