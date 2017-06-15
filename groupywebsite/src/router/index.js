import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import videos from '@/components/videos'
import idol from '@/components/idol'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    }, {
	  path: '/index',
	  component: index
    }, {
      path: '/videos',
      component: videos
    }, {
      path: '/idol',
      component: idol
    }
  ]
})
