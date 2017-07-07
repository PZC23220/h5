import Vue from 'vue';
import router from './router';

import App from './App.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper';
import VideoPlayer from 'vue-video-player';
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)

Vue.use(VueAwesomeSwiper);

Vue.use(VideoPlayer);
// VideoPlayer.default.config({
//   youtube: true, // default false
//   switcher: true, // default true
//   hls: true // default true
// })

 let _vm = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
