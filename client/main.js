import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import VeeValidate from 'vee-validate';

axios.defaults.baseURL = '/server/';

import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'

Vue.config.productionTip = false
Vue.use (VeeValidate, {
  locale: 'hi',
  fieldsBagName: 'vFields',
  // dictionary: dictionary.default.dictionary,
});

Vue.use(ArgonDashboard)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
