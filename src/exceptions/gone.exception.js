const BasicException = require('@exceptions/basic.exception');

/**
 * Gone exception caused by forever expired objects
 * @extends BasicException
 * @param statusInfo response message 
 * @param statusDetail logged details
 */
module.exports = class GoneException extends BasicException {
    constructor(statusInfo, statusDetail) {
        super(410, statusInfo, statusDetail);
    }
};