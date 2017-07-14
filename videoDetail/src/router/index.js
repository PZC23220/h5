import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import video from '../components/idol/video.vue';
import fans_video from '../components/fans/video.vue';
import report from '../components/idol/report.vue';
import noviceTask from '../components/idol/noviceTask.vue';
import messageBoard from '../components/idol/messageBoard.vue';
import fans_messageBoard from '../components/fans/messageBoard.vue';

import copyright from '../components/idol/copyright.vue';
import copyright_chinese from '../components/idol/copyright_chinese.vue';

import rule from '../components/idol/rule.vue';
import rule_chinese from '../components/idol/rule_chinese.vue';

import ExchangeAndWithdrawals from '../components/idol/ExchangeAndWithdrawals.vue';
import ExchangeAndWithdrawals_chinese from '../components/idol/ExchangeAndWithdrawals_chinese.vue';

import idolApply from '../components/idol/idolApply.vue';
import idolApply_chinese from '../components/idol/idolApply_chinese.vue';

import incomeDetail from '../components/idol/incomeDetail.vue';
import fansdetail from '../components/idol/fansdetail.vue';

import purchaseInstructions from '../components/fans/purchaseInstructions.vue';
import purchaseInstructions_chinese from '../components/fans/purchaseInstructions_chinese.vue';

import idol_ranking from '../components/idol/ranking.vue';
import idol_ranking_chinese from '../components/idol/ranking_chinese.vue';

import idol_allRanking from '../components/idol/allRanking.vue';
import fans_fansRanking from '../components/fans/fansRanking.vue';
import fans_idolRanking from '../components/fans/idolRanking.vue';

import medal from '../components/fans/medal.vue';
import level from '../components/fans/level.vue';

import shareVideo from '../components/shareVideo.vue';
import index from '../components/index.vue';

let Terminal = {
    // 辨别移动终端的语言：zh-cn、en-us、ko-kr、ja-jp...
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
let indexLanguage = {};

// 还可以通过language，区分开多国语言版

if(Terminal.language == 'zh-cn') {
    indexLanguage.ranking = '/idol/ranking_chinese';
    indexLanguage.copyright = '/idol/copyright_chinese';
    indexLanguage.ExchangeAndWithdrawals = '/idol/ExchangeAndWithdrawals_chinese';
    indexLanguage.idolApply = '/idol/idolApply_chinese';
    indexLanguage.rule = '/idol/rule_chinese';
    indexLanguage.purchaseInstructions = '/fans/purchaseInstructions_chinese';
} else {
    indexLanguage.ranking = '/idol/ranking_japanese';
    indexLanguage.copyright = '/idol/copyright_japanese';
    indexLanguage.ExchangeAndWithdrawals = '/idol/ExchangeAndWithdrawals_japanese';
    indexLanguage.idolApply = '/idol/idolApply_japanese';
    indexLanguage.rule = '/idol/rule_japanese';
    indexLanguage.purchaseInstructions = '/fans/purchaseInstructions_japanese';
}

console.log(indexLanguage)

export default new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/',
            redirect: '/shareVideo'
        },{
            path: '/idol/video',
            component: video
        },{
            path: '/idol/incomeDetail',
            component: incomeDetail
        },{
            path: '/idol/fansdetail',
            component: fansdetail
        },{
            path: '/idol/ranking',
            redirect: indexLanguage.ranking
        },{
            path: '/idol/ranking_japanese',
            component: idol_ranking
        },{
            path: '/idol/ranking_chinese',
            component: idol_ranking_chinese
        },{
            path: '/idol/allRanking',
            component: idol_allRanking
        },{
            path: '/idol/messageBoard',
            component: messageBoard
        },{
            path: '/fans/messageBoard',
            component: fans_messageBoard
        },{
            path: '/idol/report',
            component: report
        },{
            path: '/idol/noviceTask',
            component: noviceTask
        },{
            path: '/idol/copyright',
            redirect: indexLanguage.copyright
        },{
            path: '/idol/copyright_chinese',
            component: copyright_chinese
        },{
            path: '/idol/copyright_japanese',
            component: copyright
        },{
            path: '/idol/rule',
            redirect: indexLanguage.rule
        },{
            path: '/idol/rule_japanese',
            component: rule
        },{
            path: '/idol/rule_chinese',
            component: rule_chinese
        },{
            path: '/idol/ExchangeAndWithdrawals',
            redirect: indexLanguage.ExchangeAndWithdrawals
        },{
            path: '/idol/ExchangeAndWithdrawals_japanese',
            component: ExchangeAndWithdrawals
        },{
            path: '/idol/ExchangeAndWithdrawals_chinese',
            component: ExchangeAndWithdrawals_chinese
        },{
            path: '/idol/idolApply',
            redirect: indexLanguage.idolApply
        },{
            path: '/idol/idolApply_japanese',
            component: idolApply
        },{
            path: '/idol/idolApply_chinese',
            component: idolApply_chinese
        },{
            path: '/fans/fansRanking',
            component: fans_fansRanking   
        },{
            path: '/fans/idolRanking',
            component: fans_idolRanking   
        },{
            path: '/fans/purchaseInstructions',
            redirect: indexLanguage.purchaseInstructions   
        },{
            path: '/fans/purchaseInstructions_japanese',
            component: purchaseInstructions   
        },{
            path: '/fans/purchaseInstructions_chinese',
            component: purchaseInstructions_chinese   
        },{
            path: '/fans/medal',
            component: medal   
        },{
            path: '/fans/level',
            component: level   
        },{
            path: '/fans/video',
            component: fans_video   
        },{
            path: '/shareVideo',
            component: shareVideo
        },{
            path: '/index',
            component: index
        }
    ]
});