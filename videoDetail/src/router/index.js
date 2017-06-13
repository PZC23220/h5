import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import video from '../views/idol/video.vue';
import community from '../views/idol/community.vue';
import comment from '../views/idol/comment.vue';
import incomeDetail from '../views/idol/incomeDetail.vue';
import fansdetail from '../views/idol/fansdetail.vue';
import idol_ranking from '../views/idol/ranking.vue';
import fans_ranking from '../views/fans/ranking.vue';
import idol_index from '../views/idol/index.vue';
import fans_index from '../views/fans/index.vue';

import video_Gcoin from '../views/idol/video/Gcoin.vue';
import video_comment from '../views/idol/video/comment.vue';
import video_likes from '../views/idol/video/likes.vue';

import index_comment from '../views/idol/index/comment.vue';
import index_dynamic from '../views/idol/index/dynamic.vue';

import community_comment from '../views/idol/community/comment.vue';
import community_dynamic from '../views/idol/community/dynamic.vue';

import comment_comment from '../views/idol/comment/comment.vue';
import comment_likes from '../views/idol/comment/likes.vue';

import admissionTime from '../views/idol/fansdetail/admissionTime.vue';
import cheerNumber from '../views/idol/fansdetail/cheerNumber.vue';
import totalContribution from '../views/idol/fansdetail/totalContribution.vue';

import GcoinsContribution from '../views/fans/ranking/GcoinsContribution.vue';
import popularity from '../views/fans/ranking/popularity.vue';

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
                {path: '/idol/index/dynamic', component: index_dynamic},
                {path: '/idol/index/comment', component: index_comment},
            ]
        },{
            path: '/fans/index',
            component: fans_index
        },{
            path: '/idol/video',
            component: video,
            children: [
                {path: '', redirect: 'Gcoin'},
                {path: '/idol/video/Gcoin', component: video_Gcoin},
                {path: '/idol/video/comment', component: video_comment},
                {path: '/idol/video/likes', component: video_likes}
            ]
        },{
            path: '/idol/community',
            component: community,
            children: [
                {path: '', redirect: 'comment'},
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
            component: fansdetail,
            children: [
                {path: '', redirect: 'totalContribution'},
                {path: '/idol/fansdetail/totalContribution', component: totalContribution},
                {path: '/idol/fansdetail/admissionTime', component: admissionTime},
                {path: '/idol/fansdetail/cheerNumber', component: cheerNumber}
            ]
        },{
            path: '/idol/ranking',
            component: idol_ranking
        },{
            path: '/fans/ranking',
            component: fans_ranking,
            children: [
                {path: '', redirect: 'GcoinsContribution'},
                {path: '/fans/ranking/GcoinsContribution', component: GcoinsContribution},
                {path: '/fans/ranking/popularity', component: popularity}
            ]   
        }
    ]
});