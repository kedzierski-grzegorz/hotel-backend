/** @format */

const BadRequestException = require("@exceptions/bad-request.exception");

/**
 * Bad request exception caused by failed request validation.
 *
 * It's a convenience wrapper for validation errors returned by express-validator.
 *
 * @extends BadRequestException
 * @param {express-validator.Result} result The result of calling validationResult().
 */
module.exports = class ValidatorException extends BadRequestException {
  constructor(result) {
    super(
      "Request validation failed",
      result
        .formatWith((err) => {
          return err.msg;
        })
        .mapped()
    );
  }
};
