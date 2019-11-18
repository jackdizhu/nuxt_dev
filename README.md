# nuxt

* nuxt kog element-ui axios eslint serverMiddleware serverMiddleware
* pm2 pm2.json
* 日志文件不在配置文件(路径不能有大写)

```sh
# 需要执行以下命令
pm2 flush
pm2 reloadLogs
```

```js
/**
// 以配置文件启动 npm run build && pm2 start
ecosystem.config.js
*/
/**
// 以配置文件方式启动
// 启动
npm run build && pm2 start pm2.json --env production
// 重载进程
npm run build && pm2 reload all --update-env production
// 重新启动(存在无服务 时间间隔)
npm run build && pm2 restart all --update-env production
// restart = stop+start
// reload = 重新读取配置文件
// reload 实现了0秒的停机重新加载
// pm2 日志管理
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 100K // 日志文件大小
pm2 set pm2-logrotate:retain 30 // 保留的日志文件个数
pm2 set pm2-logrotate:compress false // gzip 压缩
pm2 set pm2-logrotate:rotateModule false // 分割 pm2 日志
pm2 set pm2-logrotate:rotateInterval '0 0 * * *' // 设置强制分割，默认值是0 0 * * * 每天晚上0点分割
pm2 conf pm2-logrotate // 查看配置
// pm2 config 需要配置日志合并
"merge_logs": true

pm2 scale [app-name] 10 // 扩容/缩容 到10个实例
pm2 update // pm2重启 重置实例id
*/
{
  "apps": [
    {
      "name": "app1", // 应用进程名称
      "cwd": "", // 应用启动的路径
      "script": "node_modules/nuxt/bin/nuxt.js", // 启动脚本路径
      "log_date_format": "YYYY-MM-DD HH:mm Z", // 指定日志日期格式
      "error_file": "./logs/app-err.log", // 记录标准错误流
      "out_file": "./logs/app-out.log", // 记录标准输出流
      "pid_file": "./pids/app-out.pid", // 可能会导致pm2日志过大
      "instances": "max", // 应用启动实例个数
      "min_uptime": "60s", // 应用运行少于时间被认为是异常启动
      "max_restarts": 10, // 最大异常重启次数
      "max_memory_restart": "300M", // 最大内存限制数，超出自动重启
      "cron_restart": "* * * * *", // 定时重启启动 分 时 日 月 周
      "watch": false, // 监听重启
      "ignore_watch": [ // 忽略监听的文件夹
        "node_modules",
        "logs"
      ],
      "merge_logs": true,
      "exec_interpreter": "node", // 指定的脚本解释器 shell node
      "exec_mode": "cluster", // 应用启动模式，支持fork和cluster模式 cluster --> 端口复用模式
      "autorestart": true, // 发生异常的情况下自动重启 默认为true
      "vizion": false, // 版本控制
      "args": "" // 传递给脚本的参数
    }
  ]
}
```

## consola nuxt 自带console模块

```js
// 配置环境变量
CONSOLA_LEVEL: 0 - 5(error - trace)
```

## log 等级配置

```js
const logger = function (isDev) {
  let keys = {
    'log': 0, 'info': 1, 'warn': 3, 'error': 4
  }
  let level = isDev ? 0 : 3
  for (const key in keys) {
    if (Object.prototype.hasOwnProperty.call(keys, key)) {
      const item = keys[key]
      const $fn = console[key]
      console[key] = function (...arr) {
        if (item < level) {
          return false
        }
        $fn.call(null, ...arr)
      }
    }
  }
}
logger(config.dev)
```

## log4js

* layout pattern 定义 log 打印格式

```js
console: {
  type: 'console',
  layout: {
    type: "pattern",
    pattern: "(%z)[%d{yyyy-MM-dd hh.mm.ss} %p] %m%n"
  }
}
```

* %r time in toLocaleTimeString format
* %p log level
* %c log category
* %h hostname
* %m log data
* %d date, formatted - default is ISO8601, format options are: ISO8601, ISO8601_WITH_TZ_OFFSET, ABSOLUTE, DATE, or any string compatible with the date-format library. e.g. %d{DATE}, %d{yyyy/MM/dd-hh.mm.ss}
* %% % - for when you want a literal % in your output
* %n newline
* %z process id (from process.pid)
* %f full path of filename (requires enableCallStack: true on the category, see configuration object)
* %f{depth} path’s depth let you chose to have only filename (%f{1}) or a chosen number of directories
* %l line number (requires enableCallStack: true on the category, see configuration object)
* %o column postion (requires enableCallStack: true on the category, see configuration object)
* %s call stack (requires enableCallStack: true on the category, see configuration object)
* %x{\<tokenname>} add dynamic tokens to your log. Tokens are specified in the tokens parameter.
* %X{\<tokenname>} add values from the Logger context. Tokens are keys into the context values.
* %[ start a coloured block (colour will be taken from the log level, similar to colouredLayout)
* %] end a coloured block
