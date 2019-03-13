import Vue from 'vue'
import './plugins/vuetify'
import './plugins/dialog'
import App from './App.vue'
import router from './router'
import store from './store'
import './permission' // permission control

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
