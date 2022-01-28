const BasicException = require('@exceptions/basic.exception');

/**
 * Bad request exception caused by incorrect or missing required parameters
 * @extends BasicException
 * @param statusInfo response message 
 * @param statusDetail logged details
 */
module.exports = class BadRequestException extends BasicException {
    constructor(statusInfo, statusDetail) {
        super(400, statusInfo, statusDetail);
    }
};