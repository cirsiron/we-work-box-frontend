import Vue from 'vue'
import root from './root.vue'
import ElementUI from 'element-ui'
import store from '../store'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#root',
  store,
  render: h => h(root)
})
