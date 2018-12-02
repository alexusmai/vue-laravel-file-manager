/* eslint-disable-next-line */
import '@babel/polyfill';
import Vue from 'vue';
import store from './store';
import App from './FileManager.vue';

Vue.config.productionTip = process.env.NODE_ENV === 'production';

window.fm = new Vue({
  store,
  render: h => h(App),
}).$mount('#fm');
