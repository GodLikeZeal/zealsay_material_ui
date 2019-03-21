import Vue from 'vue'
import './plugins'
import App from './App.vue'
// Components
import './components'

import store from './store'
import './permission' // permission control

import router from './router'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
