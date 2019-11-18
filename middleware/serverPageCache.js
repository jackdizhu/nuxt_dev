const LRU = require('lru-cache')
let cachePage = new LRU({
  max: 100, // 缓存队列长度
  maxAge: 1000 * 60 // 缓存1分钟
})
export default function (req, res, next) {
  let url = req._parsedOriginalUrl
  let pathName = url.pathname
  console.info(`lru-cache --> ${pathName}`)
  // 通过路由判断，指定路由进行缓存
  if (['/', '/home'].includes(pathName)) {
    const cacheHtml = cachePage.get(pathName)
    if (cacheHtml) {
      return res.end(cacheHtml.html, 'utf-8')
    } else if (!res.oldEnd) {
      res.oldEnd = res.end
      // 重写res.end
      res.end = function (data) {
        if (res.statusCode === 200) {
          // 设置缓存
          cachePage.set(pathName, { html: data })
        }
        res.oldEnd(data, 'utf-8')
      }
    }
  }
  next()
}
