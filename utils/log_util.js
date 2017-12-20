'use strict'

let log4js = require('log4js');
let logConfig = require('../config/log_config');
log4js.configure(logConfig);
let logUtil = {};
let errorLogger = log4js.getLogger('errorLogger');
let resLogger = log4js.getLogger('resLogger');

//error log
logUtil.logError = function (ctx, error, resTime) {
  if (ctx && error) {
    errorLogger.error(formatError(ctx, error, resTime));
  }
};
//response log
logUtil.logResponse = function (ctx, resTime) {
  if (ctx) {
    resLogger.info(formatRes(ctx, resTime));
  }
};
//format response log
let formatRes = function (ctx, resTime) {
  let logText = new String();

  //response header
  logText += "\n" + "*************** response log start ***************" + "\n";

  //add request log
  logText += formatReqLog(ctx.request, resTime);

  //response status
  logText += "response status: " + ctx.status + "\n";

  //body
  logText += "response body: " + "\n" + JSON.stringify(ctx.body) + "\n";

  //footer
  logText += "*************** response log end ***************" + "\n";

  return logText;

}
//format error log
let formatError = function (ctx, err, resTime) {
  let logText = new String();

  logText += "\n" + "*************** error log start ***************" + "\n";
  logText += formatReqLog(ctx.request, resTime);
  logText += "err name: " + err.name + "\n";
  logText += "err message: " + err.message + "\n";
  logText += "err stack: " + err.stack + "\n";
  logText += "*************** error log end ***************" + "\n";

  return logText;
};

//formate request log
let formatReqLog = function (req, resTime) {

  let logText = new String();

  let method = req.method;
  logText += "request method: " + method + "\n";
  logText += "request originalUrl:  " + req.originalUrl + "\n";
  logText += "request client ip:  " + req.ip + "\n";

  let startTime;
  if (method === 'GET') {
    logText += "request query:  " + JSON.stringify(req.query) + "\n";
  } else {
    logText += "request body: " + "\n" + JSON.stringify(req.body) + "\n";
  }

  logText += "response time: " + resTime + "\n";

  return logText;
}
module.exports = logUtil;

