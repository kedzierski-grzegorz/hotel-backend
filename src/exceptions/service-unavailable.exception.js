const BasicException = require('@exceptions/basic.exception');

/**
 * Service unavailable exception caused by service or its part down
 * @extends BasicException
 * @param statusInfo response message 
 * @param statusDetail logged details
 */
module.exports = class ServiceUnavailable extends BasicException {
    constructor(statusInfo, statusDetail) {
        super(503, statusInfo, statusDetail);
    }
};