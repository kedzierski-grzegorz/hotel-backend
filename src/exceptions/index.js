/** @format */

module.exports.Exception = require("@exceptions/basic.exception");

module.exports.BadRequestException = require("@exceptions/bad-request.exception");
module.exports.ConflictException = require("@exceptions/conflict.exception");
module.exports.ForbiddenException = require("@exceptions/forbidden.exception");
module.exports.GoneException = require("@exceptions/gone.exception");
module.exports.NotFoundException = require("@exceptions/not-found.exception");
module.exports.ServiceUnavailableException = require("@exceptions/service-unavailable.exception");
module.exports.TooManyRequestsException = require("@exceptions/too-many-requests.exception");
module.exports.UnauthorizedException = require("@exceptions/unauthorized.exception");
module.exports.UnprocessableEntityException = require("@exceptions/unprocessable-entity.exception");
module.exports.ValidatorException = require("@exceptions/validator.exception.js");