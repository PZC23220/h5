import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import video from '../components/idol/video.vue';
import community from '../components/idol/community.vue';
import comment from '../components/idol/comment.vue';
import messageBoard from '../components/idol/messageBoard.vue';
import copyright from '../components/idol/copyright.vue';
import ExchangeAndWithdrawals from '../components/idol/ExchangeAndWithdrawals.vue';
import idolApply from '../components/idol/idolApply.vue';
import incomeDetail from '../components/idol/incomeDetail.vue';
import fansdetail from '../components/idol/fansdetail.vue';
import idol_ranking from '../components/idol/ranking.vue';
import idol_allRanking from '../components/idol/allRanking.vue';
import fans_ranking from '../components/fans/ranking.vue';
import idol_index from '../components/idol/index.vue';
import fans_index from '../components/fans/index.vue';
import fans_dynamic_comment from '../components/fans/dynamic_comment.vue';

import idol_index_comment from '../components/idol/index/comment.vue';
import idol_index_dynamic from '../components/idol/index/dynamic.vue';

import fans_index_comment from '../components/fans/index/comment.vue';
import fans_index_dynamic from '../components/fans/index/dynamic.vue';

import community_comment from '../components/idol/community/comment.vue';
import community_dynamic from '../components/idol/community/dynamic.vue';

import comment_comment from '../components/idol/comment/comment.vue';
import comment_likes from '../components/idol/comment/likes.vue';

import admissionTime from '../components/idol/fansdetail/admissionTime.vue';
import cheerNumber from '../components/idol/fansdetail/cheerNumber.vue';
import totalContribution from '../components/idol/fansdetail/totalContribution.vue';

import GcoinsContribution from '../components/fans/ranking/GcoinsContribution.vue';
import popularity from '../components/fans/ranking/popularity.vue';

import shareVideo from '../components/shareVideo.vue';

export default new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/',
            redirect: '/idol/index'
        },{
            path: '/idol/index',
            component: idol_index,
            children: [
                {path: '', redirect: 'dynamic'},
                {path: '/idol/index/dynamic', component: idol_index_dynamic},
                {path: '/idol/index/comment', component: idol_index_comment}
            ]
        },{
            path: '/fans/index',
            component: fans_index,
            children: [
                {path: '', redirect: 'dynamic'},
                {path: '/fans/index/dynamic', component: fans_index_dynamic},
                {path: '/fans/index/comment', component: fans_index_comment}
            ]
        },{
            path: '/fans/dynamic_comment',
            component: fans_dynamic_comment
        },{
            path: '/idol/video',
            component: video
        },{
            path: '/idol/community',
            component: community,
            children: [
                {path: '', redirect: 'dynamic'},
                {path: '/idol/community/comment', component: community_comment},
                {path: '/idol/community/dynamic', component: community_dynamic}
            ]
        },{
            path: '/idol/comment',
            component: comment,
            children: [
                {path: '', redirect: 'comment'},
                {path: '/idol/comment/comment', component: comment_comment},
                {path: '/idol/comment/likes', component: comment_likes}
            ]
        },{
            path: '/idol/incomeDetail',
            component: incomeDetail
        },{
            path: '/idol/fansdetail',
            component: fansdetail
        },{
            path: '/idol/ranking',
            component: idol_ranking
        },{
            path: '/idol/allRanking',
            component: idol_allRanking
        },{
            path: '/idol/messageBoard',
            component: messageBoard
        },{
            path: '/idol/copyright',
            component: copyright
        },{
            path: '/idol/ExchangeAndWithdrawals',
            component: ExchangeAndWithdrawals
        },{
            path: '/idol/idolApply',
            component: idolApply
        },{
            path: '/fans/ranking',
            component: fans_ranking,
            children: [
                {path: '', redirect: 'GcoinsContribution'},
                {path: '/fans/ranking/GcoinsContribution', component: GcoinsContribution},
                {path: '/fans/ranking/popularity', component: popularity}
            ]   
        },{
            path: '/shareVideo',
            component: shareVideo
        }
    ]
});