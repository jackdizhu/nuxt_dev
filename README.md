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
npm run build && pm2 start pm2.json --env production
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
