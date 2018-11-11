import Vue from 'vue';
import store from './store';
import App from './FileManager.vue';

Vue.config.productionTip = false;

window.fm = new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
