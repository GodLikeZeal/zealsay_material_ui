import VuetifyMessage from 'vuetify-message'

Vue.use(VuetifyMessage, {
  x: 'right', // default
  y: 'top', // default bottom
  color: 'info', // default
  icon: 'info',
  timeout: 3000, // default
  mode: '',
  property: 'message' // default
});