'use strict';

function ErrorCode() {
}

ErrorCode.prototype.success = (msg) => {
    return {
        errorCode : 0,
        data : msg || "success"
    }
}
ErrorCode.prototype.paramsInvalid = (msg) => {
    return {
        errorCode : 1001,
        errorMsg : msg || "params invalid"
    }
}
ErrorCode.prototype.apiFailed = (msg) => {
    return {
        errorCode : 2001,
        errorMsg : msg || "api failed"
    }
}
module.exports = new ErrorCode();
