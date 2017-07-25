import Vue from 'vue';
import router from './router';

import App from './App.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper';
import VideoPlayer from 'vue-video-player';
import VueScroller from 'vue-scroller'
import VueLazyload from 'vue-lazyload'
Vue.use(VueScroller)
Vue.use(VueLazyload, {
        preLoad: 1,
	    error: 'http://h5.groupy.vip/static/images/pic_default_2.png',
	    loading: 'http://h5.groupy.vip/static/images/pic_default_2.png',
	    attempt: 1
})

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
