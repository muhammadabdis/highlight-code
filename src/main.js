import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'

import DataCode from './components/preset/DataCode'
import DataLsp from './components/preset/DataLsp'
import DataErr from './components/preset/DataErr'

import user from './store/user'
import notification from './store/notification'

import './assets/style.css'
import './assets/highlighter.css'

Vue.config.productionTip = false

Vue.use(Vuex)

Vue.component(DataCode.name, DataCode)
Vue.component(DataLsp.name, DataLsp)
Vue.component(DataErr.name, DataErr)

new Vue({
  render: h => h(App),
  store: new Vuex.Store({
    modules: {
      user,
      notification
    }
  })
}).$mount('#app')
