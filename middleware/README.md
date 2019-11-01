# 中间件

## auth.js vue 路由中间件

* 相当于 路由守卫(可以调用服务端环境)

```js
// *.vue 文件单个路由使用中间件
middleware: 'auth',
// nuxt.config.js 全局配置中间件
router: {
  middleware: 'auth'
},
```

## serverLog 服务端 中间件

* 相当于 koa-* 自定义中间件

```js
// nuxt.config.js
serverMiddleware: [
  '@/middleware/serverLog'
],
```
