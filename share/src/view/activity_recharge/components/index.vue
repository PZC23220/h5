<template>
    <div class="main">
         <div class="content">
            <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/acticity_banner/banner-recharge.jpg" class="banner">
            <!-- <h2>{{activity.theme}}</h2> -->
            <div class="activity_time">
                <!-- <p class="share-sns" v-if="isFans"><span @click="shareSns('share_facebook')"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/sns/icon_facebook_1.png"><i>シェア</i></span><span @click="shareSns('share_twitter')"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/sns/icon_twitter_1.png"><i>ツィート</i></span></p> -->
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
                <p v-html="activity.rule.p4"></p>
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
        },
        mounted() {
        },
        created() {
            if(getParams('isFans') == 1) {
                this.isFans = false;
            }else {
                this.isFans = true;
            }
        }
    }
</script>