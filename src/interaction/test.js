import Vue from 'vue'
import Test from './test.vue'

import index from './index.js'

Vue.use(index)

new Vue({
  el: '#app',
  render: h => h(Test)
})