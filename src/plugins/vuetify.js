import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/src/stylus/app.styl'
import zhHans from 'vuetify/es5/locale/zh-Hans'
import '@mdi/font/css/materialdesignicons.css'
import { Ripple } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  theme: {
    primary: '#4caf50',
    secondary: '#4caf50',
    tertiary: '#495057',
    accent: '#82B1FF',
    error: '#f55a4e',
    info: '#00d3ee',
    success: '#5cb860',
    warning: '#ffa21a'
  },
  iconfont: 'mdi',
  directives: {
    Ripple
  },
  lang: {
    locales: { zhHans },
    current: 'zh-Hans'
  }
});
