/**
 * Created by yaoze on 2016/9/26.
 */

// 组件只有import之后才能使用
import index_japanese from './components/index.vue'
import index_chinese from './components/indexChinese.vue'
import allRanking from './components/allRanking.vue'

let Terminal = {
    // 辨别移动终端的语言：zh-cn、en-us、ko-kr、ja-jp...
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
let indexLanguage = {};

// 还可以通过language，区分开多国语言版

if(Terminal.language == 'zh-cn') {
    indexLanguage.index = '/index_chinese';
} else {
    indexLanguage.index = '/index_japanese';
}

const routes =
    [
        {
            path: '/',
            redirect: indexLanguage.index,
        },{
            path: '/index_chinese',
            component: index_chinese,
        },{
            path: '/index_japanese',
            component: index_japanese,
        },{
            path: '/allRanking',
            component: allRanking,
        },
    ];
export default routes;
