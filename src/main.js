import { createApp } from 'vue';
import { createStore } from 'vuex';
// store
import fm from './store';
// App
import App from './FileManager.vue';

// create new store
const store = createStore({
    strict: import.meta.env.DEV,
    modules: { fm },
});

window.fm = createApp(App).use(store).mount('#fm');
