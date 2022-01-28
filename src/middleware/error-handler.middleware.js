/**
 * Handle subclassess of BasicException.
 *
 * If this middleware is called with a subclass of BasicException
 * (i.e. it contains `statusInfo` field), it returns a suitable
 * HTTP error code together with any metadata provided in the thrown exception.
 *
 * If `err` is not a subclass of BasicException, it throws HTTP 500
 * with the error name as message, and additionally logs the error.
 *
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 *
 * @prettier
 */
module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.statusInfo === undefined) {
    err.statusCode = 500;
    err.statusInfo = err.message;
    err.statusDetail = err.detail;
  }

  res.status(err.statusCode).send({
    status: "error",
    message: err.statusInfo,
    details: err.statusDetail,
  });
};
