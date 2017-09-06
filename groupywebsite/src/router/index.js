import Vue from 'vue'
import Router from 'vue-router'
import japanese from '@/components/japanese'
import chinese from '@/components/chinese'

import index_japanese from '@/components/index_japanese'
import index_chinese from '@/components/index_chinese'

import chinese_videos from '@/components/chinese/videos'
import chinese_idol from '@/components/chinese/idol'
import chinese_rule from '@/components/chinese/rule'
import chinese_privacy_policy from '@/components/chinese/privacy_policy'

import japanese_videos from '@/components/japanese/videos'
import japanese_registered from '@/components/japanese/registered'
import japanese_idol from '@/components/japanese/idol'
import japanese_rule from '@/components/japanese/rule'
import japanese_privacy_policy from '@/components/japanese/privacy_policy'

Vue.use(Router)

let Terminal = {
    // 辨别移动终端的语言：zh-cn、en-us、ko-kr、ja-jp...
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
let indexLanguage;

// 还可以通过language，区分开多国语言版

if(Terminal.language == 'zh-cn') {
    indexLanguage = '/index_chinese'
} else {
    indexLanguage = '/index_japanese'
}

console.log(indexLanguage)

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    const position = {}
    // new navigation.
    // scroll to anchor by returning the selector
    if (to.hash) {
      position.selector = to.hash
    }
    // check if any matched route config has meta that requires scrolling to top
    if (to.matched.some(m => m.meta.scrollToTop)) {
      // cords will be used if no selector is provided,
      // or if the selector didn't match any element.
      position.x = 0
      position.y = 0
    }
    // if the returned position is falsy or an empty object,
    // will retain current scroll position.
    return position
  }
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: indexLanguage
    }, {
      path: '/index_chinese',
      component: index_chinese,
      children: [
        {path: '', redirect: 'chinese'},
        {path: '/index_chinese/chinese', component: chinese}, 
        {path: '/index_chinese/chinese_videos',component: chinese_videos}, 
        {path: '/index_chinese/chinese_idol',component: chinese_idol}, 
        {path: '/index_chinese/chinese_rule',component: chinese_rule}, 
        {path: '/index_chinese/chinese_privacy_policy',component: chinese_privacy_policy}
      ]
    }, {
      path: '/index_japanese',
      component: index_japanese,
      children: [
        {path: '', redirect: 'japanese'},
        {path: '/index_japanese/japanese',component: japanese}, 
        {path: '/index_japanese/japanese_videos',component: japanese_videos}, 
        {path: '/index_japanese/japanese_registered',component: japanese_registered}, 
        {path: '/index_japanese/japanese_idol',component: japanese_idol}, 
        {path: '/index_japanese/japanese_rule',component: japanese_rule}, 
        {path: '/index_japanese/japanese_privacy_policy',component: japanese_privacy_policy}
      ]
    }
  ],
  mode: 'history',
  scrollBehavior
})
