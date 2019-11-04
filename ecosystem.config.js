const path = require('path')

module.exports = {
  "apps": [
    {
      "name": "app1_git",
      "cwd": path.resolve(__dirname, './'),
      "script": "./server/index.js",
      "log_date_format": "YYYY-MM-DD HH:mm",
      "error_file": path.resolve(__dirname, "./logs/app-err.log"),
      "out_file": path.resolve(__dirname, "./logs/app-out.log"),
      "pid_file": path.resolve(__dirname, "./logs/app-pid.pid"),
      "instances": 1,
      "min_uptime": "60s",
      "max_restarts": 10,
      "max_memory_restart": "512M",
      "cron_restart": "",
      "watch": false,
      "ignore_watch": [
        "node_modules",
        "logs"
      ],
      "merge_logs": false,
      "exec_interpreter": "node",
      "exec_mode": "cluster",
      "autorestart": true,
      "vizion": false,
      "args": "",
      "env_development": {
        "NODE_ENV": "development"
      },
      "env_production": {
        "NODE_ENV": "production"
      }
    }
  ]
}