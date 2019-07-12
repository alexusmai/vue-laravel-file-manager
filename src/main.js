/* eslint-disable-next-line */
import '@babel/polyfill';
import Vue from 'vue';
import Vuex from 'vuex';
// store
import fm from './store';
// App
import FileManager from './FileManager';
import App from './App';



Vue.use(Vuex);

// create new store
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: { fm },
});

Vue.use(FileManager, {
    store, // required
    
   
    // default headers example
    headers: {
    },
    
    baseUrl: 'http://10.134.119.125:5000/', // overwrite base url Axios
    windowsConfig: 1,
    lang: 'en',     // set language
})

Vue.config.productionTip = process.env.NODE_ENV === 'production';
new Vue({
  el: '#app',
  store,
  render: h => h(App)
}) 
