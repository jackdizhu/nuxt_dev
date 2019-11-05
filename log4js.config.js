let path = require('path');

// 日志根目录
let baseLogPath = path.resolve(__dirname, './logs');

// 错误日志目录
let errorPath = '/error';
// 错误日志文件名
let errorFileName = 'error';
// 错误日志输出完整路径
let errorLogPath = baseLogPath + errorPath + '/' + errorFileName;

module.exports = {
  pm2: true,
  pm2InstanceVar: 'INSTANCE_ID',
  // 日志格式等设置
  appenders: {
    console: {
      type: 'console',
      layout: {
        type: "pattern",
        pattern: "[%d{yyyy-MM-dd hh:mm:ss} %z] %m"
      }
    },
    error: {
      type: 'dateFile',
      filename: errorLogPath,
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      maxLogSize: 1000,
      numBackups: 3,
      path: errorPath,
      layout: {
        type: "pattern",
        pattern: "[%d{yyyy-MM-dd hh:mm:ss} %z] %m"
      }
    }
  },
  // 供外部调用的名称和对应设置定义
  categories: {
    default: {
      appenders: ['console'],
      level: 'all'
    },
    error: {
      appenders: ['console'],
      level: 'error'
    }
  },
  baseLogPath,
  replaceConsole: true
};