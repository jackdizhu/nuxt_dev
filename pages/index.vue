<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        test
      </h1>
      <h2 class="subtitle">
        My lovely Nuxt.js project {{routeName}}
      </h2>
      <div class="links">
        <nuxt-link to="/home">
          home
        </nuxt-link>
        <!-- <a href="/home">home</a> -->
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  __meta_type__: 'noAuth',
  components: {
    Logo
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: 'My custom description' },
        { hid: 'param', name: 'type', content: '1' }
      ]
    }
  },
  data () {
    return {
      title: 'nuxt-index.vue',
      routeName: ''
    }
  },
  asyncData () {
    return {
      routeName: '/'
    }
  },
  mounted () {
    console.log(this)
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => {
        this.$nuxt.$loading.finish()
      }, 5000)
    })
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
