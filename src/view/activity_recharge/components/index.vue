<template>
    <div class="main">
         <div class="content">
            <img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/acticity_banner/banner-recharge.jpg" class="banner">
            <!-- <h2>{{activity.theme}}</h2> -->
            <div class="activity_time">
                <p class="share-sns" v-if="false"><span @click="shareSns('share_facebook')"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/sns/icon_facebook_1.png"><i>シェア</i></span><span @click="shareSns('share_twitter')"><img src="http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/sns/icon_twitter_1.png"><i>ツイート</i></span></p>
                <h4>{{activity.time}}</h4>
                <div class="duration_time">
                    <p><span>{{activity.start}}</span><i>2017年10月20日（金）11:00:00</i></p>
                    <p><span>{{activity.end}}</span><i>2017年11月19日（日）23:59:59</i></p>
                </div>
            </div>
            <!-- <div class="activity_rule">
                <h4>{{activity.desc.title}}</h4>
                <p v-html="activity.desc.p1"></p>
                <p v-html="activity.desc.p2"></p>
                <p v-html="activity.desc.p3"></p>
            </div> -->
            <div class="activity_rule">
                <h4>{{activity.obj.title}}</h4>
                <p v-html="activity.obj.p1"></p>
            </div>
            <div class="activity_rule">
                <h4>{{activity.rule.title}}</h4>
                <p v-html="activity.rule.p1"></p>
                <p v-html="activity.rule.p2"></p>
                <p v-html="activity.rule.p3"></p>
                <p style="font-weight:600;color: #EE634E;" v-html="activity.rule.p4"></p>
            </div>
         </div>
    </div>
</template>
<style type="text/css">
    h4 {
        background-image: linear-gradient(139deg, #FF9E6B 0%, #EE634E 100%);
    }
</style>
<script>
    import http from '@api/js/http.js';
    require('@api/js/common.js')
    export default {
        data() {
            return {
                ranking: [],
                me: {},
                idx: 0,
                idx2: 0,
                loadingShow: false,
                havedMe: false,
                activity: {
                    theme:'大チャンス！購入したコイン数に応じて、100%プレゼント',
                    time: 'イベント期間',
                    start: '開始日時',
                    end: '終了日時',
                    rewardList: 'ランキング',
                    works: '作品',
                    Gcoin: 'コイン',
                    like: 'Like',
                    videos: '参加作品一覧',
                    noRanking: '集計中',
                    award: '賞品',
                    me: '自分の順位',
                    all: '全体ランキング',
                    more: 'もっと見る',
                    rule: {
                        title: '詳細',
                        p1: '1.実施期間中に購入したコインの数に応じて、もれなく100%分プレゼントします。（実施期間中1000コインを購入した場合、さらに1000コインをプレゼント)。',
                        p2: '2.実施期間中は何度でもご利用いただけます。',
                        p3: '3.キャペーン終了時点で決済が完了していない場合、キャンペーン対象外となります。',
                        p4: '4.アプリ内のコイン購入ページからご購入ください。プレゼントは、キャンペーン期間中にコインを購入すると自動で付与されます。'
                    },
                    obj: {
                        title: '対象',
                        p1: 'Groupyに登録したファンの方'
                    },
                },
                isFans: true,
                activityInfo: {}
            }
        },
        methods: {
            shareSns(val) {
                var self = this;
                if(location.hostname == 'h5.groupy.vip') {
                    var shareURL = `http://share.groupy.vip/html/activity_recharge/index.html`;
                }else {
                    var shareURL = `http://share.groupy.cn/html/activity_recharge/index.html`;
                }
                var title = `コイン倍増キャンペーン`;
                var description = `Groupyで購入したコインはもれなく100%増量！チャンスをつかんでコインを沢山手に入れよう...`;
                var shareImg = `http://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/optupload/%E5%85%85%E5%80%BC.jpg`;
                window.setupWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler(val, {'title':title,'description':description,'shareImg':shareImg,'shareURL':shareURL})
                })
          },
        },
        mounted() {
        },
        created() {
            if(getParams('isFans') == 1) {
                this.isFans = false;
            }else {
                this.isFans = true;
            }
            window.setupWebViewJavascriptBridge(function(bridge) {
                bridge.callHandler('setTitle', {'title':'コイン100%増量キャンペーン'})
            })
            // let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
             if(getParams('language') == 'cn') {
                 this.activity= {
                    theme:' 充值翻倍',
                    time: '活动时间',
                    start: '开始时间',
                    end: '结束时间',
                    rewardList: ' 活动排名',
                    works: '视频',
                    Gcoin: '获得G币',
                    like: '获得Like',
                    videos: '参加作品一覧',
                    noRanking: '暂无排名 ',
                    award: '活动奖励',
                    me: ' 我的排名',
                    all: '全部排名',
                    more: '查看更多',
                    rule: {
                        title: '活动详情',
                        p1: '1.活动期间内，粉丝每充值一次，将获得翻倍的G币（如充一千送一千）',
                        p2: '2.活动期间，可无限次参与充值翻倍活动',
                        p3: '3.活动结束时未完成支付的，将作废',
                        p4: '4.请到G币充值页面直接充值，充值即时生效！'
                    },
                    obj: {
                        title: '对象',
                        p1: 'Groupy的注册粉丝'
                    },
                }
              } else {
                this.activity= {
                    theme:'大チャンス！購入したコイン数に応じて、100%プレゼント',
                    time: 'イベント期間',
                    start: '開始日時',
                    end: '終了日時',
                    rewardList: 'ランキング',
                    works: '作品',
                    Gcoin: 'コイン',
                    like: 'Like',
                    videos: '参加作品一覧',
                    noRanking: '集計中',
                    award: '賞品',
                    me: '自分の順位',
                    all: '全体ランキング',
                    more: 'もっと見る',
                    rule: {
                        title: '詳細',
                        p1: '1.実施期間中に購入したコインの数に応じて、もれなく100%分プレゼントします。（実施期間中1000コインを購入した場合、さらに1000コインをプレゼント)。',
                        p2: '2.実施期間中は何度でもご利用いただけます。',
                        p3: '3.キャペーン終了時点で決済が完了していない場合、キャンペーン対象外となります。',
                        p4: '4.アプリ内のコイン購入ページからご購入ください。プレゼントは、キャンペーン期間中にコインを購入すると自動で付与されます。'
                    },
                    obj: {
                        title: '対象',
                        p1: 'Groupyに登録したファンの方'
                    },
                }
              }
        }
    }
</script>