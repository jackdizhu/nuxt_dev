export default function (ctx) {
  // /home?token=1
  const { req, headers, route, query, redirect, isStatic } = ctx
  /**
  'isStatic',
  'isDev',
  'isHMR',
  'app',
  'payload',
  'error',
  'base',
  'env',
  'req',
  'res',
  'ssrContext',
  'redirect',
  'beforeNuxtRender',
  'route',
  'next',
  '_redirected',
  '_errored',
  'params',
  'query',
  '$axios'
   */
  // console.log(Object.keys(ctx), 'ctx')
  let path = (route && route.path) || '/'
  let redirectURL = '/'
  let token = (headers && headers.token) || (req && req.header && req.header.token) || query.token
  // 需要进行权限判断的页面开头
  console.log(`-->${path} token: ${token}`)
  if (!isStatic && !token && path !== redirectURL) {
    redirect(redirectURL)
    return false
  }
  // next()
}
