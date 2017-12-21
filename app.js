const Koa = require('koa');
const app = new Koa();

const json = require('koa-json');
const onerror = require('koa-onerror');
const favicon = require('koa-favicon');
const bodyparser = require('koa-bodyparser')();
// const logUtil = require('./utils/log_util');

const v1 = require('./routes/v1');

// error handler
onerror(app);

// middlewares
app.use(bodyparser);
app.use(json());
app.use(favicon(__dirname + '/favicon.ico'));
// app.use(require('koa-static')(__dirname + '/public'));

// logger
// app.use(async (ctx, next) => {
//   const start = new Date();
//   let ms;
//   try {
//     await next();
//
//     ms = new Date() - start;
//     logUtil.logResponse(ctx, ms);
//   } catch (error) {
//
//     ms = new Date() - start;
//     logUtil.logError(ctx, error, ms);
//   }
// });

// routes
app.use(v1.routes(), v1.allowedMethods());

module.exports = app;
