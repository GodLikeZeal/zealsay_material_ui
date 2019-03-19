import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import all from './modules/all'
import getters from './getters'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user, app: all
  },
  getters
});

export default store
