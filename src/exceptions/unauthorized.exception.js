const BasicException = require('@exceptions/basic.exception');

/**
 * Unauthorized exception caused by not logged-in user
 * @extends BasicException
 * @param statusInfo response message 
 * @param statusDetail logged details
 */
module.exports = class UnauthorizedException extends BasicException {
    constructor(statusInfo, statusDetail) {
        super(401, statusInfo, statusDetail);
    }
};