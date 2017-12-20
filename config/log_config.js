'use strict'

const path = require('path');
const errorLogPath = path.resolve(__dirname, '../logs/error/error');
const responseLogPath = path.resolve(__dirname, "../logs/response/response");

module.exports = {
  "appenders":
    [
      //error log
      {
        "category":"errorLogger",
        "type": "dateFile",
        "filename": errorLogPath,
        "alwaysIncludePattern":true,
        "pattern": "-yyyy-MM-dd.log"
      },
      //response log
      {
        "category":"resLogger",
        "type": "dateFile",
        "filename": responseLogPath,
        "alwaysIncludePattern":true,
        "pattern": "-yyyy-MM-dd.log"
      }
    ],
  "levels":
    {
      "errorLogger":"ERROR",
      "resLogger":"ALL"
    }
}