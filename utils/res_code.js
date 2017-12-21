'use strict';

function ResCode() {
}

ResCode.prototype.success = (msg) => {
    return {
        errorCode : 0,
        data : msg || "success"
    }
}
ResCode.prototype.paramsInvalid = (msg) => {
    return {
        errorCode : 1001,
        errorMsg : msg || "params invalid"
    }
}
ResCode.prototype.apiFailed = (msg) => {
    return {
        errorCode : 2001,
        errorMsg : msg || "api failed"
    }
}
ResCode.prototype.orderFailed = (msg) => {
    return {
        errorCode : 3001,
        errorMsg : msg || "api failed"
    }
}
module.exports = new ResCode();
