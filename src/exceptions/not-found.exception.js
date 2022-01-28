const BasicException = require('@exceptions/basic.exception');

/**
 * Not found exception caused by not finding a resource with provided params
 * @extends BasicException
 * @param statusInfo response message 
 * @param statusDetail logged details
 */
module.exports = class NotFoundException extends BasicException {
    constructor(statusInfo, statusDetail) {
        super(404, statusInfo, statusDetail);
    }
};