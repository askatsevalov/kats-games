import Vue from 'vue';

import { BootstrapVue, IconsPlugin, BVToastPlugin } from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import App from './App.vue';
import EventBus from './utils/event-bus';
import router from './router';
import store from './store';

import DefaultLayout from './layouts/DefaultLayout.vue';
import EmptyLayout from './layouts/EmptyLayout.vue';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(BVToastPlugin);

Vue.prototype.$eventBus = EventBus;

Vue.component('DefaultLayout', DefaultLayout);
Vue.component('EmptyLayout', EmptyLayout);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
