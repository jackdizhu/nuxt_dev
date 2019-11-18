const fs = require('fs')

module.exports = {
  mode: 'universal',
  serverMiddleware: [
    '@/middleware/serverLog',
    { path: '/', handler: '@/middleware/serverPageCache.js' },
    { path: '/home', handler: '@/middleware/serverPageCache.js' }
  ],
  router: {
    middleware: 'auth',
    extendRoutes (routes, resolve) {
      // console.log(`extendRoutes --> path --> ${routes[0].path}`);
      // console.log(`extendRoutes --> name --> ${routes[0].name}`);
      for (let i = 0; i < routes.length; i++) {
        let item = routes[i]
        if (item.meta) {
          item.meta.$type = 'auth'
        } else {
          item.meta = {
            $type: 'auth'
          }
        }
        // if (!item.component) {
        //   continue
        // }
        let componentStr = ''
        try {
          componentStr = fs.readFileSync(item.component).toString()
        } catch (error) {
          componentStr = ''
        }
        if (/__meta_type__:\s*['"]([^'"]+)['"],/g.test(componentStr)) {
          item.meta.$type = RegExp['$1']
        } else {
          item.meta.$type = 'auth'
        }
      }
    }
  },
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  // loading: {
  //   color: '#000000',
  //   duration: 5000,
  //   height: '5px'
  // },
  // loading: 'components/loading.vue',
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/axios',
    '@/plugins/router'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios'
  ],
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
