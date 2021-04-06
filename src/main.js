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
    apiPoint: "http://120.92.153.221:5555/",
    message: "",
    navInputValue: ""
  },
  render: h => h(App)
})
