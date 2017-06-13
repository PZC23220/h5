import Vue from 'vue';
import router from './router';

import App from './App.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper';

Vue.use(VueAwesomeSwiper);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
