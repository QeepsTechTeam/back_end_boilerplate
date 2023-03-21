
class HTTPError extends Error{
    constructor(message, httpStatusCode) {
      super(message);
      this.httpStatusCode = httpStatusCode
    }
}

function withErrorHandler(handler) {
  return async (req, res) => {
    try {

      const result = await handler(req, res);
      res.status(200).json({ data: result });

    } catch (error) {

      const httpStatusCode = error.httpStatusCode || 500;
      const message = error.message || 'Internal server error.';
      res.status(httpStatusCode).json({ error: message });

    }
  };
}


module.exports = {
  HTTPError,
  withErrorHandler
}