var log4js = require('log4js');

var logConfig = require('../log4js.config.js');

// 加载配置文件
log4js.configure(logConfig);

// 调用预先定义的日志名称
var errorLog = log4js.getLogger('errorLogger');
var consoleLog = log4js.getLogger('consoleLog');


module.exports = {
  // logMiddleware: async (ctx, next, dev) => {
  //   ctx.logger = dev ? consoleLog : errorLog
  //   await next();
  // },
  consoleLog: consoleLog,
  errorLog: errorLog
}
