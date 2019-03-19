import Vue from 'vue'
import './plugins'
import App from './App.vue'
import router from './router'
import store from './store'
import './permission' // permission control

// Components
import './components'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
