import Vue from 'vue';
import App from './App';
import router from './router/index';
import VueResource from 'vue-resource';
import './common/stylus/index.css';
Vue.config.productionTip = false;
Vue.use(VueResource);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
