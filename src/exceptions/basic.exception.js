/**
 * Basic Exception to inherit after
 * @extends Error
 * @param statusCode response code
 * @param statusInfo response message 
 * @param statusDetail logged details
 */
module.exports = class BasicException extends Error {
    constructor(statusCode, statusInfo, statusDetail) {
        super(statusInfo || 'Internal server error');

        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
        this.statusCode = statusCode || 500;
        this.statusDetail = statusDetail;
        this.statusInfo = statusInfo || 'Internal server error';
    }
};