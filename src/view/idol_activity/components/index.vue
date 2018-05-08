<template>
    <div class="main">
         <div class="content">
            <img v-if="isOver" src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/acticity_banner/banner-coke-over.jpg" class="banner">
            <img v-else src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/acticity_banner/activity_cokelife.jpg" class="banner">
            <h2>{{activity.theme}}</h2>
            <p class="share-sns" v-if="isFans"><span @click="shareSns('share_facebook')"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/sns/icon_facebook_1.png"><i>シェア</i></span><span @click="shareSns('share_twitter')"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/sns/icon_twitter_1.png"><i>ツイート</i></span></p>
            <div class="activity_rule">
                <p>中国のファッション誌「可楽生活」に、上位1名の所属ユニットメンバー全員が特集ページに登場する！是非奮ってご参加ください！</p>
            </div>
            <div class="activity_time">
                <h4>{{activity.time}}</h4>
                <div class="duration_time">
                    <p><span>{{activity.start}}</span><i>2017年10月20日（金） 11:00:00</i></p>
                    <p><span>{{activity.end}}</span><i>2017年10月26日（木） 23:59:59</i></p>
                </div>
            </div>
            <div class="activity_rule">
                <h4>{{activity.obj.title}}</h4>
                <p v-html="activity.obj.p1"></p>
            </div>
            <ul class="activity_reward">
                <h4>{{activity.award}}</h4>
                <li>
                    <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/activity/icon_1.png">
                    <div class="reward_desc">
                        <p><i>{{activity.rewards[0].p1}}</i></p>
                        <p><i>{{activity.rewards[0].p2}}</i></p>
                        <p><i>{{activity.rewards[0].p3}}</i></p>
                        <!-- <p><span></span><i>{{activity.rewards[0].p2}}</i></p>
                        <p><span></span><i>{{activity.rewards[0].p3}}</i></p>
                        <p><span></span><i>{{activity.rewards[0].p4}}</i></p>
                        <p><span></span><i>{{activity.rewards[0].p5}}</i></p>
                        <p><span></span><i>{{activity.rewards[0].p6}}</i></p>
                        <p><span></span><i>{{activity.rewards[0].p7}}</i></p> -->
                    </div>
                </li>
                <!-- <li>
                    <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/activity/icon_2.png">
                    <div class="reward_desc">
                        <p><span></span><i>{{activity.rewards[1].p1}}</i></p>
                        <p><span></span><i>{{activity.rewards[1].p2}}</i></p>
                        <p><span></span><i>{{activity.rewards[1].p3}}</i></p>
                        <p><span></span><i>{{activity.rewards[1].p4}}</i></p>
                        <p><span></span><i>{{activity.rewards[1].p5}}</i></p>
                    </div>
                </li>
                <li>
                    <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/activity/icon_3.png">
                    <div class="reward_desc">
                        <p><span></span><i>{{activity.rewards[2].p1}}</i></p>
                        <p><span></span><i>{{activity.rewards[2].p2}}</i></p>
                        <p><span></span><i>{{activity.rewards[2].p3}}</i></p>
                        <p><span></span><i>{{activity.rewards[2].p4}}</i></p>
                        <p><span></span><i>{{activity.rewards[2].p5}}</i></p>
                    </div>
                </li> -->
            </ul>
            <div class="activity_rule">
                <h4>{{activity.desc.title}}</h4>
                <p v-html="activity.desc.p1"></p>
                <!-- <p v-html="activity.desc.p2"></p> -->
                <!-- <p v-html="activity.desc.p3"></p> -->
            </div>
            <div class="activity_rule" v-if="isFans">
                <h4>{{activity.rule.title}}</h4>
                <p v-html="activity.rule.p1"></p>
                <img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/acticity_banner/activity_coke_tip.jpg" style="width: 66vw;box-sizing: border-box;padding:12px;">
                <p v-html="activity.rule.p2"></p>
                <!-- <p v-html="activity.rule.p3"></p> -->
            </div>
            <div class="activity_rule">
                <h4>{{activity.fansrule.title}}</h4>
                <p v-html="activity.fansrule.p1"></p>
                <p v-html="activity.fansrule.p2"></p>
                <p v-html="activity.fansrule.p3"></p>
            </div>
            <div class="activity_ranking" v-if="isFans">
                <h4>{{activity.rewardList}}</h4>
                <p class="no_ranking" v-if="ranking.length<0 && loadingShow">{{activity.noRanking}}</p>
                <ul class="ranking_list">
                    <div class="none_loading" :class="{'none_loading_show': loadingShow}">
                        <li>
                            <span class="first">1</span>
                            <div class="img_content"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_img.png" class="avatar"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_crown_1.png" class="crown"></div>
                            <div class="idol_content">
                                <span>idolName</span>
                                <div class="idol_desc">
                                    <!-- <p><span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png"><em>0</em></span><i>{{activity.Gcoin}}</i></p> -->
                                    <p><span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png"><em>0</em></span><!-- <i>{{activity.like}}</i> --></p>
                                    <p><span><em>0</em></span><i>{{activity.works}}</i></p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <span class="second">2</span>
                            <div class="img_content"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_img.png" class="avatar"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_crown_2.png" class="crown"></div>
                            <div class="idol_content">
                                <span>idolName</span>
                                <div class="idol_desc">
                                    <!-- <p><span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png"><em>0</em></span><i>{{activity.Gcoin}}</i></p> -->
                                    <p><span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png"><em>0</em></span><!-- <i>{{activity.like}}</i> --></p>
                                    <p><span><em>0</em></span><i>{{activity.works}}</i></p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <span class="second">3</span>
                            <div class="img_content"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/default_img/default_img.png" class="avatar"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_crown_3.png" class="crown"></div>
                            <div class="idol_content">
                                <span>idolName</span>
                                <div class="idol_desc">
                                    <!-- <p><span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png"><em>0</em></span><i>{{activity.Gcoin}}</i></p> -->
                                    <p><span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png"><em>0</em></span><!-- <i>{{activity.like}}</i> --></p>
                                    <p><span><em>0</em></span><i>{{activity.works}}</i></p>
                                </div>
                            </div>
                        </li>
                    </div>
                    <h5 v-if="havedMe">{{activity.me}}</h5>
                    <li v-if="havedMe">
                        <span :class="[{'first':me.ranking == 0},{'second':me.ranking == 1},{'three':me.ranking > 1},{'ten':me.ranking > 9}]">{{me.ranking?me.ranking:'-'}}</span>
                        <div class="img_content"><span class="avatar"><img v-lazy="me.avatar"></span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_crown_1.png" class="crown" v-if="me.ranking?me.ranking==1:false"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_crown_2.png" class="crown" v-if="me.ranking?me.ranking==2:false"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_crown_3.png" class="crown" v-if="me.ranking?me.ranking>2:false"></div>
                        <div class="idol_content">
                            <span>{{me.nickname?me.nickname:'...'}}</span>
                            <div class="idol_desc">
                                <!-- <p><span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png"><em>{{Number(me.gcoin?me.gcoin:0).toLocaleString()}}</em></span><i>{{activity.Gcoin}}</i></p> -->
                                <p><span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png"><em>{{Number(me.popularity?me.popularity:0).toLocaleString()}}</em></span><!-- <i>{{activity.like}}</i> --></p>
                                <p><span><em>{{Number(me.videoCount?me.videoCount:0).toLocaleString()}}</em></span><i>{{activity.works}}</i></p>
                            </div>
                        </div>
                    </li>
                    <h5 v-if="ranking.length > 0">{{activity.all}}</h5>
                    <li v-for="(idol,key) in ranking" v-if="ranking.length > 0 && key < 3">
                        <span :class="[{'first':key == 0},{'second':key == 1},{'three':key > 1}]">{{key+1}}</span>
                        <div class="img_content"><span class="avatar"><img v-lazy="idol.avatar"></span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_crown_1.png" class="crown" v-if="key == 0"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_crown_2.png" class="crown" v-if="key == 1"><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/crown_metal/icon_crown_3.png" class="crown" v-if="key > 1"></div>
                        <div class="idol_content">
                            <span>{{idol.nickname?idol.nickname:'...'}}</span>
                            <div class="idol_desc">
                                <!-- <p><span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png"><em>{{Number(idol.gcoin?idol.gcoin:0).toLocaleString()}}</em></span><i>{{activity.Gcoin}}</i></p> -->
                                <p><span><img src="https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png"><em>{{Number(idol.popularity?idol.popularity:0).toLocaleString()}}</em></span><!-- <i>{{activity.like}}</i> --></p>
                                <p><span><em>{{Number(idol.videoCount?idol.videoCount:0).toLocaleString()}}</em></span><i>{{activity.works}}</i></p>
                            </div>
                        </div>
                    </li>
                    <li v-if="ranking.length <= 0" style="text-align: center;">集計中...</li>
                    <router-link to="/top10" class="reard_more" v-if="ranking.length > 0">{{activity.more}}</router-link>
                </ul>
            </div>
         </div>
    </div>
</template>
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
                isOver: false,
                activity: {
                    theme:'#可楽生活#',
                    time: 'イベント期間',
                    start: '開始日時',
                    end: '終了日時',
                    rewardList: 'ランキング',
                    works: '作品',
                    Gcoin: 'コイン',
                    like: 'Like',
                    videos: '参加作品一覧',
                    noRanking: '集計中',
                    award: '特典',
                    me: '自分の順位',
                    all: '全体ランキング',
                    more: 'もっと見る',
                    rule: {
                        title: '応募方法',
                        p1: '1. イベント期間中、「#可楽生活」タグをつけて投稿します。投稿内容は自由です。<i style="color:#f4ba4b;font-weight:600;">（タグの付け方：下からタグをタップして選択してください。手入力のタグは無効とされます）</i>',
                        p2: '2. イベント期間中は、動画を何本投稿しても問題ありません。'
                        // p3: '3.イベント期間中は、動画を何本投稿してもOKです。'
                    },
                    obj: {
                        title: '対象',
                        p1: 'ランキング1位の所属ユニット全員（ソロの方も参加可能）'
                    },
                    desc: {
                        title: '「可楽生活」とは？',
                        p1: '<i>「可楽生活」</i>とは、中国の大手新聞社「羊城晩報」が発行する発行部数45万部超の若者向けファッション＆ライフスタイル誌です。 2003年に創刊し、発行部数が中国の華南地方１位の人気を誇ります。2013年には読者がより便利に情報を入手できるように、公式アプリがリリースされました。',
                    },
                    fansrule: {
                        title: '集計方法',
                        p1: '1. 全ての参加動画のLike数（ハート）の合計によってランキングが決まります。',
                        p2: '2. ランキングはイベント詳細ページにリアルタイムで確認できます。',
                        p3: '3.イベント期間外は、「＃可楽生活」をつけて投稿しても集計されません。'
                    },
                    rewards: [{
                        p1: '※ランキング1位の所属ユニットメンバー全員が「可楽生活」の特集ページに登場！',
                        p2: '※当選ユニットはプロフィールを10/30までにご提出いただきます。',
                        p3: '※「可楽生活」のライターによるインタービューもございますので、ご了承ください。'
                        // p5: '中国の人気サイトweiboやbilibiliにて好評の参加動画が発表されます。'
                    }, {
                        p1: '賞金10000円',
                        p2: 'アプリの起動画面に掲載されます（掲載期間は1日となります）。',
                        p3: 'Twitter公式アカウントで2位として発表されます。',
                        p4: '中国の人気サイトbilibiliに好評の参加動画が発表されます。'
                    }, {
                        p1: '賞金5000円',
                        p2: 'Twitter公式アカウントで3位として発表されます。',
                        p3: '中国の人気サイトweiboやbilibiliに好評の参加作品は発表されます。'
                    }]
                },
                isFans: true,
                activityInfo: {}
            }
        },
        methods: {
          shareSns(val) {
            var self = this;
            if(self.isFans) {
                if(location.hostname == 'h5.groupy.vip') {
                    var shareURL = `https://share.groupy.vip/html/activity/index.html?activityId=${getParams('activityId')}&idolId=${self.me.idol_id}`;
                }else {
                    var shareURL = `https://share.groupy.cn/html/activity/index.html?activityId=${getParams('activityId')}&idolId=${self.me.idol_id}`;
                }
                var title = `Groupyと【可楽生活】のコラボ企画`;
                var description = `大人気雑誌に登場できるイベント参加中、動画をいっぱい投稿したので、応援してね`;
                var shareImg = `https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/acticity_banner/banner-coke.jpg`;
            }else {
                if(location.hostname == 'h5.groupy.vip') {
                    var shareURL = `https://share.groupy.vip/html/activity/index.html?activityId=${getParams('activityId')}&isFans=1`;
                }else {
                    var shareURL = `https://share.groupy.cn/html/activity/index.html?activityId=${getParams('activityId')}&isFans=1`;
                }
                var title = `Groupyと【可楽生活】のコラボ企画`;
                var description = `上位1が大人気雑誌に登場？！動画がいっぱい投稿されているので、応援しよう^人^）`;
                var shareImg = `https://photoh5-jp.oss-ap-northeast-1.aliyuncs.com/acticity_banner/banner-coke.jpg`;
            }
            console.log(shareURL)
            window.setupWebViewJavascriptBridge(function(bridge) {
                bridge.callHandler(val, {'title':title,'description':description,'shareImg':shareImg,'shareURL':shareURL})
            })
          },
          getList(token) {
            let self = this;
            let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
            if(self.idx < 1) {
                let token_ = getParams('token');
                if(token) {
                    http.defaults.headers.common['Authorization'] = 'Token '+token;
                }else if(token_!='(null)' && token_!='') {
                    http.defaults.headers.common['Authorization'] = 'Token ' + token_;
                }
                http.get('/video/activityIdols',{
                    params: {
                        activityId:getParams('activityId'),
                        rows: 10
                    }
                }).then(function(res){
                    self.ranking = res.data.ranking;
                    self.activityInfo = res.data.activityInfo;
                    if(res.data.self) {
                        self.me = res.data.self;
                        self.havedMe = true;
                    }
                    self.loadingShow = true;
                    if(res.data.isActivityEnded) {
                        self.isOver = true;
                    }else {
                        self.isOver = false;
                    }
                    console.log(res)
                }).catch(function(){
                    self.idx++;
                    window.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('getToken', {'targetType':'0','targetId':'0'}, function responseCallback(responseData) {
                            self.getList(responseData.token);
                        })
                    })
                });
            }else {
                 window.setupWebViewJavascriptBridge(function(bridge) {
                    if(_lan === 'zh-cn') {
                        bridge.callHandler('makeToast', '服务器出错，请稍后重试');
                     }else {
                        bridge.callHandler('makeToast', 'エラーが発生しました\nしばらくしてからもう一度お試しください');
                     }
                })
            }
          }
        },
        mounted() {
        },
        created() {
            let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
            console.log(getParams('isFans'))
            if(getParams('isFans') == 1) {
                this.isFans = false;
            }else {
                this.isFans = true;
            }
            this.getList();
        }
    }
</script>
