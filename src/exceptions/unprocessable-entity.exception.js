/**
 * @prettier
 */
const BasicException = require("@exceptions/basic.exception");

/**
 * Unprocessable entity exception (HTTP 422).
 *
 * Used when the request is formatted correctly but can't be processed
 * for some reason.
 *
 * @extends BasicException
 * @param statusInfo response message
 * @param statusDetail logged details
 */
module.exports = class UnprocessableEntityException extends BasicException {
  constructor(statusInfo, statusDetail) {
    super(422, statusInfo, statusDetail);
  }
};
