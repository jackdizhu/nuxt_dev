const Koa = require('koa')
const { Nuxt, Builder } = require('nuxt')
// const consola = require('consola')
// consola.level = 1; // 配置环境变量 CONSOLA_LEVEL
const cluster = require('cluster');

const app = new Koa()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

// console.log(Object.keys(console));
const logger = function (isDev) {
  let keys = {
    'debug': -1, 'log': 0, 'info': 1, 'success': 2, 'warn': 3, 'error': 4
  }
  let level = isDev ? 0 : 1
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
// const logger = consola.create({
//   level: 4,
//   reporters: [
//     new consola.JSONReporter()
//   ],
//   defaults: {
//     additionalColor: 'white'
//   }
// })
// 日志配置
// const log4js = require('../com/log4Util.js')
// global.logger = config.dev ? log4js.consoleLog : log4js.errorLog

async function start () {
  // app.use(async (ctx, next) => {
  //   ctx.logger = logger
  //   await next();
  // })
  // app.use(async (ctx, next) => {
  //   ctx.logger = config.dev ? log4js.consoleLog : log4js.errorLog
  //   await next();
  // })
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  // 平滑重启
  let isRun = false
  let serve = app.listen(port, host)
  serve.on('listening', function () {
    isRun = true
    console.info(`listening http://${host}:${port}`)
  })
  serve.on('error', function (error) {
    console.error(error)
  })
  process.on('exit', function () {
    console.info('-- exit --')
  })
  // 等待响应处理完成
  process.on('SIGINT', function () {
    console.info('----> SIGINT ')
    if (!isRun) {
      // 通知主进程 不再接收任务派发
      cluster.worker && cluster.worker.disconnect();
      process.exit(1);
      return false
    }
    // 停止接收新请求
    serve.close((err) => {
      if (!err) {
        process.exit(1);
      } else {
        // 15秒后 强制退出
        console.error(err)
        setTimeout(function () {
          process.exit(1);
        }, 15000)
      }
    })
    // 通知主进程 不再接收任务派发
    cluster.worker && cluster.worker.disconnect();
  })
}

start()
