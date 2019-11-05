<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        test
      </h1>
      <h2 class="subtitle">
        My lovely Nuxt.js {{appName}}
      </h2>
      <div class="links">
        <a href="https://nuxtjs.org/"
           target="_blank"
           class="button--green">
          Documentation
        </a>
        <a href="https://github.com/nuxt/nuxt.js"
           target="_blank"
           class="button--grey">
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  middleware: 'auth',
  components: {
    Logo
  },
  data () {
    return {
      appName: ''
    }
  },
  async asyncData ({ $axios }) {
    await $axios.get('http://localhost:3000/')
    return {
      appName: 'nuxtApp'
    }
  },
  mounted () {
    let num = 0
    let debug = this.$route.query.debug
    if (!debug) {
      return false
    }
    let time = setInterval(() => {
      num++
      this.$axios.get('http://localhost:3000/')
      if (num > 1000) {
        clearInterval(time)
      }
    }, 100)
  }
}
</script>
<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.container /deep/ .title {
  background: #35495e;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
