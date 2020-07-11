class NotPermittedError extends Error {
  constructor(...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotPermittedError);
    }

    this.name = 'NotPermittedError';
  }
}

module.exports = NotPermittedError;
