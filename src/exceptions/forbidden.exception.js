const BasicException = require('@exceptions/basic.exception');

/**
 * Forbidden exception caused by trying accessing resources user do not have permissions to
 * @extends BasicException
 * @param statusInfo response message 
 * @param statusDetail logged details
 */
module.exports = class ForbiddenException extends BasicException {
    constructor(statusInfo, statusDetail) {
        super(403, statusInfo, statusDetail);
    }
};