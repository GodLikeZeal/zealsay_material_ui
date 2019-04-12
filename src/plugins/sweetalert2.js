import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';

Vue.use(VueSweetalert2, {
  buttonsStyling: false,
  heightAuto: false,
  grow: true,
  confirmButtonClass: 'mx-4 v-btn v-btn--round theme--light primary',
  confirmButtonText: '确定',
  cancelButtonClass: 'mx-4 v-btn v-btn--round theme--light default',
  cancelButtonText: '取消'
});