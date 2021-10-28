import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import infiniteScroll from 'vue-infinite-scroll';
import Toast from 'vue-toastification';
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css';

Vue.config.productionTip = false;
Vue.use(infiniteScroll);

Vue.use(Toast, {
    transition: 'Vue-Toastification__bounce',
    maxToasts: 5,
    newestOnTop: true,
    timeout: 1500,
});
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');