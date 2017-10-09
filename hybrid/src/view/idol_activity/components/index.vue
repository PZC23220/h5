<template>
    <div class="main">
         <div class="content">
            <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/acticity_banner/banner-coke.jpg" class="banner">
            <h2>{{activity.theme}}</h2>
            <div class="activity_time">
                <h4>{{activity.time}}</h4>
                <div class="duration_time">
                    <p><span>{{activity.start}}</span><i>2017年10月20日（金） 00:00:00</i></p>
                    <p><span>{{activity.end}}</span><i>2017年10月26日（木） 23:59:59</i></p>
                </div>
            </div>
            <div class="activity_rule">
                <h4>{{activity.desc.title}}</h4>
                <p v-html="activity.desc.p1"></p>
                <p v-html="activity.desc.p2"></p>
                <p v-html="activity.desc.p3"></p>
            </div>
            <div class="activity_rule">
                <h4>{{activity.obj.title}}</h4>
                <p v-html="activity.obj.p1"></p>
            </div>
            <div class="activity_rule">
                <h4>{{activity.rule.title}}</h4>
                <p v-html="activity.rule.p1"></p>
                <p v-html="activity.rule.p2"></p>
                <p v-html="activity.rule.p3"></p>
            </div>
            <div class="activity_rule">
                <h4>{{activity.fansrule.title}}</h4>
                <p v-html="activity.fansrule.p1"></p>
                <p v-html="activity.fansrule.p2"></p>
            </div>
            <div class="activity_ranking">
                <h4>{{activity.rewardList}}</h4>
                <p class="no_ranking" v-if="ranking.length<0 && loadingShow">{{activity.noRanking}}</p>
                <ul class="ranking_list">
                    <div class="none_loading" :class="{'none_loading_show': loadingShow}">
                        <li>
                            <span class="first">1</span>
                            <div class="img_content"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/default_img/default_img.png" class="avatar"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/crown_metal/icon_crown_1.png" class="crown"></div>
                            <div class="idol_content">
                                <span>idolName</span>
                                <div class="idol_desc">
                                    <p><span style="text-align: left;margin-left: 10px;"><em>0</em></span><i style="text-align: left;margin-left: -5px;">{{activity.works}}</i></p>
                                    <p><span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png"><em>0</em></span><i>{{activity.Gcoin}}</i></p>
                                    <p><span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png"><em>0</em></span><i>{{activity.like}}</i></p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <span class="second">2</span>
                            <div class="img_content"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/default_img/default_img.png" class="avatar"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/crown_metal/icon_crown_2.png" class="crown"></div>
                            <div class="idol_content">
                                <span>idolName</span>
                                <div class="idol_desc">
                                    <p><span style="text-align: left;margin-left: 10px;"><em>0</em></span><i style="text-align: left;margin-left: -5px;">{{activity.works}}</i></p>
                                    <p><span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png"><em>0</em></span><i>{{activity.Gcoin}}</i></p>
                                    <p><span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png"><em>0</em></span><i>{{activity.like}}</i></p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <span class="second">3</span>
                            <div class="img_content"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/default_img/default_img.png" class="avatar"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/crown_metal/icon_crown_3.png" class="crown"></div>
                            <div class="idol_content">
                                <span>idolName</span>
                                <div class="idol_desc">
                                    <p><span style="text-align: left;margin-left: 10px;"><em>0</em></span><i style="text-align: left;margin-left: -5px;">{{activity.works}}</i></p>
                                    <p><span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png"><em>0</em></span><i>{{activity.Gcoin}}</i></p>
                                    <p><span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png"><em>0</em></span><i>{{activity.like}}</i></p>
                                </div>
                            </div>
                        </li>
                    </div>
                    <h5 v-if="havedMe">{{activity.me}}</h5>
                    <li v-if="havedMe">
                        <span :class="[{'first':me.ranking == 0},{'second':me.ranking == 1},{'three':me.ranking > 1},{'ten':me.ranking > 9}]">{{me.ranking?me.ranking:'-'}}</span>
                        <div class="img_content"><img v-lazy="me.avatar" class="avatar"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/crown_metal/icon_crown_1.png" class="crown" v-if="me.ranking?me.ranking==1:false"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/crown_metal/icon_crown_2.png" class="crown" v-if="me.ranking?me.ranking==2:false"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/crown_metal/icon_crown_3.png" class="crown" v-if="me.ranking?me.ranking>2:false"></div>
                        <div class="idol_content">
                            <span>{{me.nickname?me.nickname:'...'}}</span>
                            <div class="idol_desc">
                                <p><span style="text-align: left;margin-left: 10px;"><em>{{Number(me.videoCount?me.videoCount:0).toLocaleString()}}</em></span><i style="text-align: left;margin-left: -5px;">{{activity.works}}</i></p>
                                <p><span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png"><em>{{Number(me.gcoin?me.gcoin:0).toLocaleString()}}</em></span><i>{{activity.Gcoin}}</i></p>
                                <p><span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png"><em>{{Number(me.popularity?me.popularity:0).toLocaleString()}}</em></span><i>{{activity.like}}</i></p>
                            </div>
                        </div>
                    </li>
                    <h5 v-if="ranking.length > 0">{{activity.all}}</h5>
                    <li v-for="(idol,key) in ranking" v-if="ranking.length > 0 && key < 3">
                        <span :class="[{'first':key == 0},{'second':key == 1},{'three':key > 1}]">{{key+1}}</span>
                        <div class="img_content"><img v-lazy="idol.avatar" class="avatar"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/crown_metal/icon_crown_1.png" class="crown" v-if="idol.ranking?idol.ranking==1:false"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/crown_metal/icon_crown_2.png" class="crown" v-if="idol.ranking?idol.ranking==2:false"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/crown_metal/icon_crown_3.png" class="crown" v-if="idol.ranking?idol.ranking>2:false"></div>
                        <div class="idol_content">
                            <span>{{idol.nickname?idol.nickname:'...'}}</span>
                            <div class="idol_desc">
                                <p><span style="text-align: left;margin-left: 10px;"><em>{{Number(idol.videoCount?idol.videoCount:0).toLocaleString()}}</em></span><i style="text-align: left;margin-left: -5px;">{{activity.works}}</i></p>
                                <p><span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_coins.png"><em>{{Number(idol.gcoin?idol.gcoin:0).toLocaleString()}}</em></span><i>{{activity.Gcoin}}</i></p>
                                <p><span><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/icon/timeline_icon_likes.png"><em>{{Number(idol.popularity?idol.popularity:0).toLocaleString()}}</em></span><i>{{activity.like}}</i></p>
                            </div>
                        </div>
                    </li>
                    <li v-if="ranking.length <= 0" style="text-align: center;">没有排名</li>
                    <router-link to="/top10" class="reard_more" v-if="ranking.length > 0">{{activity.more}}</router-link>
                </ul>
            </div>
            <ul class="activity_reward">
                <h4>{{activity.award}}</h4>
                <li>
                    <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/activity/icon_1.png">
                    <div class="reward_desc">
                        <p><i>{{activity.rewards[0].p1}}</i></p>
                        <!-- <p><span></span><i>{{activity.rewards[0].p2}}</i></p>
                        <p><span></span><i>{{activity.rewards[0].p3}}</i></p>
                        <p><span></span><i>{{activity.rewards[0].p4}}</i></p>
                        <p><span></span><i>{{activity.rewards[0].p5}}</i></p>
                        <p><span></span><i>{{activity.rewards[0].p6}}</i></p>
                        <p><span></span><i>{{activity.rewards[0].p7}}</i></p> -->
                    </div>
                </li>
                <!-- <li>
                    <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/activity/icon_2.png">
                    <div class="reward_desc">
                        <p><span></span><i>{{activity.rewards[1].p1}}</i></p>
                        <p><span></span><i>{{activity.rewards[1].p2}}</i></p>
                        <p><span></span><i>{{activity.rewards[1].p3}}</i></p>
                        <p><span></span><i>{{activity.rewards[1].p4}}</i></p>
                        <p><span></span><i>{{activity.rewards[1].p5}}</i></p>
                    </div>
                </li>
                <li>
                    <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/h5_groupy/activity/icon_3.png">
                    <div class="reward_desc">
                        <p><span></span><i>{{activity.rewards[2].p1}}</i></p>
                        <p><span></span><i>{{activity.rewards[2].p2}}</i></p>
                        <p><span></span><i>{{activity.rewards[2].p3}}</i></p>
                        <p><span></span><i>{{activity.rewards[2].p4}}</i></p>
                        <p><span></span><i>{{activity.rewards[2].p5}}</i></p>
                    </div>
                </li> -->
            </ul>
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
                activity: {
                    theme:' 可楽生活',
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
                        title: '応募方法',
                        p1: '1.イベント期間中、<i>「#可楽生活」</i>タグをつけて投稿します。テーマはご自由にお考えください。',
                        p2: '2.イベント期間外は、<i>「＃可楽生活」</i>をつけて投稿しても集計されません。',
                        p3: '3.イベント期間中は、動画を何本投稿してもOKです。'
                    },
                    obj: {
                        title: '対象',
                        p1: 'ランキング1位の所属ユニット全員（ソロの方も参加可能）'
                    },
                    desc: {
                        title: '「可楽生活」とは？',
                        p1: '<i>「可楽生活」</i>とは、中国の大手新聞社「羊城晩報」傘下の15〜35歳の若者向けのファッション＆ライフスタイル誌です。',
                        p2: '2003年に創刊し、発行部数が中国の華南地方一位として、高く評価されています。更に2013年に読者がより便利に情報を入手できるように、公式アプリがリリースされました。',
                        p3: '中国のファッション誌<i>「可楽生活」</i>に、上位1名の所属ユニット全員が中面ページに登場する！是非奮ってご参加ください！'
                    },
                    fansrule: {
                        title: '集計方法',
                        p1: '1.全ての参加動画のLike数とギフト数の合計によってランキングが決まります。',
                        p2: '2.ランキングはイベント詳細ページにリアルタイムで集計されます。'
                    },
                    rewards: [{
                        p1: 'ランキング1位の所属ユニット全員（ソロの方も参加可能）は雑誌の取材を受け、中面ページに登場して頂きます。',
                        p2: '次回のイベントのイメージキャラクターとして起用します（トップバナー・宣伝動画に出演して頂きます）。',
                        p3: 'アプリの起動画面に掲載されます（掲載期間は2日間となります）。',
                        p4: 'Twitter公式アカウントで1位として発表されます。',
                        p5: '中国の人気サイトweiboやbilibiliにて好評の参加動画が発表されます。'
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
                }
            }
        },
        methods: {
          getList(token) {
            let self = this;
            let _lan = (navigator.browserLanguage || navigator.language).toLowerCase();
            if(self.idx < 2) {
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
                    if(res.data.self) {
                        self.me = res.data.self;
                        self.havedMe = true;
                    }
                    self.loadingShow = true;
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
            this.getList();
        }
    }
</script>