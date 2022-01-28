const BasicException = require('@exceptions/basic.exception');

/**
 * Too many requests exception caused by not finished cooldown 
 * @extends BasicException
 * @param statusInfo response message 
 * @param statusDetail logged details
 */
module.exports = class TooManyRequestsException extends BasicException {
    constructor(statusInfo, statusDetail) {
        super(429, statusInfo, statusDetail);
    }
};