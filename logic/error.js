/**
 * Created by kelvinsun on 2016/12/3.
 */

class NetworkError extends Error {
    constructor (message = 'Something get wrong with network', fileName = undefined, lineNumber = undefined) {
        super(message, fileName, lineNumber);
        this.name    = this.constructor.name;
        this.message = message;
        if ('function' === typeof Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
    }
}
/**
 * @property name
 * @property message
 */
class ApplyError extends Error {
    constructor (message = 'Failed to _apply network access permission', fileName = undefined, lineNumber = undefined) {
        super(message, fileName, lineNumber);
        this.name    = this.constructor.name;
        this.message = message;
        if ('function' === typeof Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
    }
}

module.exports = { NetworkError, ApplyError, };