export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    // Object.prototype.toString.call(to.meta) === [object Object]
    // let keys = Object.keys(to.meta)
    console.log(`beforeEach --> to.meta.$type --> ${to.meta && to.meta.$type}`)
    next()
  })
  app.router.afterEach((to, from) => {
    // console.log(to, 'afterEach')
  })
}
