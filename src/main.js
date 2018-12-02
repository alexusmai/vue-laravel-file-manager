import '@babel/polyfill';
import Vue from 'vue';
import store from './store';
import App from './FileManager.vue';

Vue.config.productionTip = process.env.NODE_ENV === 'production';

window.lfm = new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
