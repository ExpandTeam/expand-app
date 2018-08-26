// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueAnalytics from 'vue-analytics';
import VueResource from 'vue-resource';
import AsyncComputed from 'vue-async-computed';
import { store } from './store';

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(AsyncComputed);

const isProd = process.env.NODE_ENV === 'production';

Vue.use(VueAnalytics, {
    id: process.env.ANALYTICS_ID,
    router,
    autoTracking: {
        exception: true,
    },
    debug: {
        enabled: !isProd,
        sendHitTask: isProd,
    },
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    components: { App },
    template: '<App />',
});
