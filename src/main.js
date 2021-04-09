import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import {formatBytes} from './utils/byte'

Vue.mixin({
  methods: {
    formatBytes,
  },
})

import routes from './routes'

const router = new VueRouter({
  routes
})


const App = require("./App.vue")
const app = new Vue({
  router: router,

  el: '#app',
  data: {
    apiPoint: "https://api.sensiblequery.com/",
    message: "",
  },
  render: h => h(App)
})
