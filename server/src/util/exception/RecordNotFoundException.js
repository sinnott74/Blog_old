class RecordNotFoundException extends Error {

  constructor(message) {
    super(message);
  }
}

module.exports = RecordNotFoundException;