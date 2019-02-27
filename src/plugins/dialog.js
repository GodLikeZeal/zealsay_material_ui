import Vue from 'vue';
import VuetifyDialog from 'vuetify-dialog'
import context from 'vue-router';

const property = '$dialog'

Vue.use(VuetifyDialog, {
  context,
  property,
  confirm: {
    actions: {
      false: '取消',
      true: {
        text: '确定',
        color: 'primary'
      }
    },
    icon: false, // to disable icon just put false
    width: 500
  },
  warning: {},
  error: {},
  prompt: {}
})