import Vue from 'vue';

import Buefy from 'buefy';
import 'buefy/dist/buefy.min.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App.vue';
import EventBus from './utils/event-bus';
import router from './router';
import store from './store';

import DefaultLayout from './layouts/DefaultLayout.vue';
import EmptyLayout from './layouts/EmptyLayout.vue';

Vue.use(Buefy, {
  defaultIconPack: 'fas',
});

Vue.prototype.$eventBus = EventBus;

Vue.component('DefaultLayout', DefaultLayout);
Vue.component('EmptyLayout', EmptyLayout);

library.add(fas, fab);
Vue.component('fa-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
