class MultipleRecordsFoundException extends Error {

  constructor(message) {
    super(message);
  }
}

module.exports = MultipleRecordsFoundException;