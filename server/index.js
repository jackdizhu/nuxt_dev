const Koa = require('koa')
const { Nuxt, Builder } = require('nuxt')
// const consola = require('consola')
// consola.level = 1; // 配置环境变量 CONSOLA_LEVEL

const app = new Koa()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

// console.log(Object.keys(console));
const logger = function (isDev) {
  let keys = {
    'log': 0, 'debug': 0, 'info': 1, 'success': 2, 'warn': 3, 'error': 4
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

process.on('SIGINT', function () {
  console.log('----> SIGINT ')
  process.exit(1)
})

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

  app
    .listen(port, host)
    .on('error', function (error) {
      console.error(error)
    })
  console.info(`listening http://${host}:${port}`)
}

start()
