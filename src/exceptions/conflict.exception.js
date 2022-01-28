const BasicException = require('@exceptions/basic.exception');

/**
 * Conflict exception caused by existing resources
 * @extends BasicException
 * @param statusInfo response message 
 * @param statusDetail logged details
 */
module.exports = class ConflictException extends BasicException {
    constructor(statusInfo, statusDetail) {
        super(409, statusInfo, statusDetail);
    }
};