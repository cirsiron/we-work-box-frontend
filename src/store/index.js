import Vue from 'vue'
import Vuex from 'vuex'
import todoModule from './todo'
import workModule from './workContents'
import plugins from './plugins'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    todoModule,
    workModule
  },
  plugins
})
